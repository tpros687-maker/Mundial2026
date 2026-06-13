export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { home, away } = req.query;
  if (!home || !away) return res.status(400).json({ error: 'home and away required' });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        system: `You are a football stats assistant. Search for real stats and return ONLY a JSON object with no markdown, no explanation. Use this exact structure:
{
  "home": {
    "name": "Team name",
    "wins": 55, "draws": 20, "losses": 25,
    "goalsFor": 1.8, "goalsAgainst": 1.1,
    "cornersAvg": 5.3, "yellowAvg": 1.5, "redAvg": 0.1,
    "ranking": 17,
    "keyPlayers": "Player1 · Player2 · Player3",
    "note": "Short team context note",
    "goalIntervals": [{"l":"1-15","v":14},{"l":"16-30","v":16},{"l":"31-45","v":22},{"l":"46-60","v":20},{"l":"61-75","v":16},{"l":"76-90","v":12}]
  },
  "away": { same structure },
  "h2h": [{"year": 2022, "home": "Team1", "hs": 2, "as": 1, "away": "Team2"}],
  "prediction": "Team X wins (~XX%). Brief reasoning."
}`,
        messages: [{
          role: 'user',
          content: `Search for FIFA World Cup 2026 pre-match analysis for ${home} vs ${away}. Find their recent stats: win rates, goals per game, corners per game, yellow/red cards per game, FIFA ranking, key players, and head-to-head history in World Cups. Return only the JSON.`
        }]
      })
    });

    const data = await response.json();
    const textBlock = data.content?.find(b => b.type === 'text');
    if (!textBlock) throw new Error('No response');
    
    const clean = textBlock.text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}