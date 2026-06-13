export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const response = await fetch(
      'https://api.balldontlie.io/fifa/worldcup/v1/matches?per_page=100',
      { headers: { Authorization: process.env.BALLDONTLIE_KEY } }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
