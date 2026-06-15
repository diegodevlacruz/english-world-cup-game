// Real World Cup facts sourced from Britannica & Wikipedia.
// Each sentence has: blank (the question), hint (grammar cue), answer, points (difficulty).
// Points scale: 100 Easy · 200 Easy-Middle · 300 Medium · 400 Middle-Hard · 500 Hard

export const FACTS = {
  'Present Simple vs Continuous': [
    {
      blank: 'Brazil ___ five World Cup titles — more than any other nation.',
      hint: '(have)',
      answer: 'has',
      points: 100,
    },
    {
      blank: 'The FIFA World Cup ___ place every four years across different host nations.',
      hint: '(take)',
      answer: 'takes',
      points: 100,
    },
    {
      blank: 'Look! The striker ___ towards goal at full speed — this could be a chance!',
      hint: '(run)',
      answer: 'is running',
      points: 200,
    },
    {
      blank: 'Germany ___ more World Cup goals than any other nation — 239 in total.',
      hint: '(hold)',
      answer: 'holds',
      points: 200,
    },
    {
      blank: 'FIFA ___ strict qualification matches to decide which 48 teams enter the 2026 tournament.',
      hint: '(organise)',
      answer: 'organises',
      points: 300,
    },
    {
      blank: 'The referee ___ the VAR footage carefully while the players ___ for his decision.',
      hint: '(review / wait)',
      answer: 'is reviewing / are waiting',
      points: 300,
    },
    {
      blank: 'The coaching staff currently ___ footage of the opposition\'s last three matches.',
      hint: '(study)',
      answer: 'is studying',
      points: 400,
    },
    {
      blank: 'Brazil ___ in every single World Cup ever held, a record no other nation ___.',
      hint: '(compete / match)',
      answer: 'competes / matches',
      points: 400,
    },
    {
      blank: 'While the referee ___ VAR, both managers ___ instructions from the touchline.',
      hint: '(consult / shout)',
      answer: 'is consulting / are shouting',
      points: 500,
    },
    {
      blank: 'The Golden Boot, which FIFA ___ to the top scorer, ___ one of the most coveted individual prizes in football.',
      hint: '(award / remain)',
      answer: 'awards / remains',
      points: 500,
    },
  ],

  'Present Perfect vs Past Simple': [
    {
      blank: 'Brazil ___ the World Cup five times — more than any other country.',
      hint: '(win)',
      answer: 'has won',
      points: 100,
    },
    {
      blank: 'Uruguay ___ the first-ever World Cup in 1930, defeating Argentina 4–2 in the final.',
      hint: '(win)',
      answer: 'won',
      points: 100,
    },
    {
      blank: 'Miroslav Klose ___ 16 goals across four World Cups — the highest total in history.',
      hint: '(score)',
      answer: 'scored',
      points: 200,
    },
    {
      blank: 'Just Fontaine ___ 13 goals at the 1958 World Cup in Sweden — the most ever in a single tournament.',
      hint: '(score)',
      answer: 'scored',
      points: 200,
    },
    {
      blank: 'So far in this tournament, Argentina ___ six goals without conceding a single one.',
      hint: '(score)',
      answer: 'has scored',
      points: 300,
    },
    {
      blank: 'France\'s Lucien Laurent ___ the very first goal in World Cup history on 13 July 1930.',
      hint: '(score)',
      answer: 'scored',
      points: 300,
    },
    {
      blank: 'No European team ___ ever ___ the World Cup on South American soil.',
      hint: '(win)',
      answer: 'has ever won',
      points: 400,
    },
    {
      blank: 'Klose ___ Ronaldo\'s record of 15 goals during the 2014 semi-final against Brazil.',
      hint: '(break)',
      answer: 'broke',
      points: 400,
    },
    {
      blank: 'Just Fontaine ___ 13 goals at the 1958 World Cup — a record that ___ unbroken for over 65 years.',
      hint: '(score / remain)',
      answer: 'scored / has remained',
      points: 500,
    },
    {
      blank: 'Since Argentina ___ the 2022 title, they ___ the current World Cup champions.',
      hint: '(win / become)',
      answer: 'won / have become',
      points: 500,
    },
  ],

  'Will vs Going to': [
    {
      blank: 'The 2026 World Cup ___ be hosted by the USA, Canada, and Mexico.',
      hint: '(will / going to)',
      answer: 'will',
      points: 100,
    },
    {
      blank: 'Look at that striker — he ___ score! There is nobody left to stop him!',
      hint: '(will / going to)',
      answer: 'is going to',
      points: 100,
    },
    {
      blank: 'I think Argentina ___ find it very difficult to defend their World Cup title.',
      hint: '(will / going to)',
      answer: 'will',
      points: 200,
    },
    {
      blank: 'FIFA has officially confirmed it — the 2026 tournament ___ feature 48 teams for the first time.',
      hint: '(will / going to)',
      answer: 'is going to',
      points: 200,
    },
    {
      blank: 'The coach has already named his starting eleven — he ___ use a 4-3-3 formation tonight.',
      hint: '(will / going to)',
      answer: 'is going to',
      points: 300,
    },
    {
      blank: 'Analysts predict that the 2026 World Cup ___ attract over five billion viewers worldwide.',
      hint: '(will / going to)',
      answer: 'will',
      points: 300,
    },
    {
      blank: 'After extra time ends at 1–1, the match ___ be decided by a penalty shootout.',
      hint: '(will / going to)',
      answer: 'is going to',
      points: 400,
    },
    {
      blank: 'With three injured defenders and ten minutes to go, the team ___ struggle to hold this lead.',
      hint: '(will / going to)',
      answer: 'is going to',
      points: 400,
    },
    {
      blank: 'Unless the defence organises itself quickly, Brazil ___ concede another goal before half-time.',
      hint: '(will / going to)',
      answer: 'will',
      points: 500,
    },
    {
      blank: 'The squad has prepared specifically for penalties, so I doubt they ___ freeze under pressure.',
      hint: '(will / going to)',
      answer: 'will',
      points: 500,
    },
  ],

  'Mixed Review': [
    {
      blank: 'Argentina ___ the 2022 World Cup in Qatar — their third world title in history.',
      hint: '(win)',
      answer: 'won',
      points: 100,
    },
    {
      blank: 'The 2026 World Cup ___ expand to 48 teams — the largest format in the tournament\'s history.',
      hint: '(will / going to)',
      answer: 'will',
      points: 100,
    },
    {
      blank: 'Look! The goalkeeper ___ a spectacular dive to tip the ball over the crossbar!',
      hint: '(make)',
      answer: 'is making',
      points: 200,
    },
    {
      blank: 'Hungary ___ El Salvador 10–1 in 1982 — still the biggest winning margin in World Cup history.',
      hint: '(beat)',
      answer: 'beat',
      points: 200,
    },
    {
      blank: 'Brazil ___ in every single World Cup since the first one was held in Uruguay in 1930.',
      hint: '(compete)',
      answer: 'has competed',
      points: 300,
    },
    {
      blank: 'The current FIFA World Cup Trophy ___ 6.175 kg and is made of solid 18-carat gold.',
      hint: '(weigh)',
      answer: 'weighs',
      points: 300,
    },
    {
      blank: 'No country ___ ever ___ the World Cup three consecutive times.',
      hint: '(win)',
      answer: 'has ever won',
      points: 400,
    },
    {
      blank: 'The 2018 World Cup in Russia ___ an estimated 3.57 billion viewers — a stunning global audience.',
      hint: '(attract)',
      answer: 'attracted',
      points: 400,
    },
    {
      blank: 'Hungary ___ 27 goals at the 1954 World Cup — a single-tournament team record that still ___ today.',
      hint: '(score / stand)',
      answer: 'scored / stands',
      points: 500,
    },
    {
      blank: 'Since the Jules Rimet Trophy ___ stolen in 1983 and never recovered, FIFA ___ a new trophy that winning nations cannot keep permanently.',
      hint: '(be / use)',
      answer: 'was stolen / uses',
      points: 500,
    },
  ],
}

export const ALL_TOPIC_KEYS = Object.keys(FACTS)
