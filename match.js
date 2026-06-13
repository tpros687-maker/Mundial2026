export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { match_id, type } = req.query;
  if (!match_id) return res.status(400).json({ error: 'match_id required' });

  const endpoint = type === 'events' ? 'match_events' : 'match_stats';
  try {
    const response = await fetch(
      `https://api.balldontlie.io/fifa/worldcup/v1/${endpoint}?match_ids[]=${match_id}`,
      { headers: { Authorization: process.env.BALLDONTLIE_KEY } }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
