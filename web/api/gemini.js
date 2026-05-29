// Vercel Serverless Function: Secure Google Gemini API Proxy
// This hides the API Key from public commits and clients, preventing key theft and automatic revocation.

// 使用 CommonJS 导出以确保在未配置 "type": "module" 的 Vercel Node.js 环境下完美兼容运行
module.exports = async function handler(req, res) {
  // 1. 允许跨域请求 (CORS Headers)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 preflight OPTIONS 请求
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 调试辅助接口：允许 GET 请求带 debug=models 时，列出该 API 密钥授权的所有可用模型
  if (req.method === 'GET') {
    const { url } = req;
    if (url && url.includes('debug=models')) {
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          return res.status(500).json({ error: 'GEMINI_API_KEY 环境变量未配置！' });
        }
        const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(googleUrl);
        const resData = await response.json();
        return res.status(response.status).json(resData);
      } catch (err) {
        return res.status(500).json({ error: '获取模型列表异常: ' + err.message });
      }
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Please use POST.' });
  }

  try {
    // 兼容可能未被自动解析为 JSON 的 Body 字符串/Stream 或 Buffer
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    } else if (Buffer.isBuffer(body)) {
      try {
        body = JSON.parse(body.toString('utf-8'));
      } catch (e) {
        body = {};
      }
    } else if (!body) {
      body = {};
    }
    
    const { modelId, payload } = body;
    
    // 2. 从 Vercel 后端环境变量读取安全配置 of API Key
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ 
        error: 'Vercel 后端未配置 GEMINI_API_KEY 环境变量。请在 Vercel 网页控制台的 Settings -> Environment Variables 中添加此变量！' 
      });
    }

    // 3. 构建 Google Gemini 官方端点 URL
    const targetModel = modelId || 'gemini-1.5-flash';
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

    // 4. 发起代理请求 (Vercel Node.js 18+ 环境原生支持 global fetch)
    const response = await fetch(googleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const resData = await response.json().catch(() => ({}));
    
    // 5. 转发响应给前端客户端
    return res.status(response.status).json(resData);

  } catch (err) {
    console.error('[Gemini Proxy Error]:', err);
    return res.status(500).json({ error: '代理中转服务器异常: ' + err.message });
  }
}
