'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// PUZZLE DATA - Add more puzzles here for daily rotation
// Puzzles rotate at 7 AM EST daily
// =============================================================================

const PUZZLES = [
  // PUZZLE 1: STICKER
  {
    id: 'sticker-puzzle',
    subtitle: 'Stick Together',
    letters: ['S', 'T', 'I', 'C', 'K', 'E', 'R'],
    keyLetters: ['E', 'R'],
    totalWordCount: 36,
    words: {
      4: ['IRES', 'RICE', 'RISE', 'RITE', 'SIRE', 'TIER', 'TIRE', 'TREK'],
      5: ['CREST', 'CRIER', 'CRIES', 'ICIER', 'RICES', 'RISER', 'RITES', 'SIRES', 'SKIER', 'TIERS', 'TIRES', 'TREKS', 'TRICE', 'TRIES'],
      6: ['CRESTS', 'CRIERS', 'KICKER', 'SICKER', 'SKIERS', 'STRIKE', 'TICKER'],
      7: ['KICKERS', 'RICKETS', 'STICKER', 'STRIKES', 'TICKERS'],
      8: ['STICKERS', 'STICKIER']
    },
    hints: {
      4: [
        "Angers or irritates",
        "Grain often served with stir-fry",
        "Go upward; get out of bed",
        "Ceremony or ritual",
        "Father, especially of a horse",
        "Level or layer, like on a cake",
        "Rubber covering on a wheel",
        "Long, difficult journey"
      ],
      5: [
        "Top of a hill; family emblem",
        "Town announcer; one who weeps",
        "Weeps or shouts",
        "More cold and frosty",
        "Pushes potatoes through a kitchen tool",
        "Early _____ (morning person); stair part",
        "Ceremonies or rituals",
        "Fathers offspring",
        "Person zooming down snowy slopes",
        "Layers, like on a wedding cake",
        "Rubber wheel coverings",
        "Long journeys on foot",
        "A moment; \"in a _____\"",
        "Attempts; gives it a go"
      ],
      6: [
        "Hill tops; waves' peaks",
        "Town announcers of old",
        "Football player who boots field goals",
        "More ill; feeling worse",
        "People racing down mountains",
        "Work stoppage; bowling achievement",
        "Your heart, informally"
      ],
      7: [
        "Football specialists",
        "Bone disease from vitamin D deficiency",
        "Adhesive label or decal (pangram!)",
        "Bowling achievements; work stoppages",
        "Hearts; stock price displays"
      ],
      8: [
        "Adhesive labels kids love to collect",
        "More adhesive; harder to remove"
      ]
    }
  },

  // PUZZLE 2: MUSICAL
  {
    id: 'musical-puzzle',
    subtitle: 'All That Jazz!',
    letters: ['M', 'U', 'S', 'I', 'C', 'A', 'L'],
    keyLetters: ['A', 'L'],
    totalWordCount: 28,
    words: {
      4: ['AILS', 'ALUM', 'CALL', 'CALM', 'CLAM', 'MAIL', 'MALL', 'SAIL', 'SLAM'],
      5: ['ALIAS', 'ALUMS', 'CALLS', 'CALMS', 'CLAIM', 'CLAMS', 'LILAC', 'LLAMA', 'MAILS', 'MALLS', 'SAILS', 'SLAMS', 'SMALL'],
      6: ['CALLUS', 'CLAIMS', 'LILACS', 'LLAMAS'],
      7: ['MUSICAL'],
      8: ['MUSICALS']
    },
    hints: {
      4: [
        "Troubles or bothers",
        "Graduate of a school",
        "Phone someone; shout out",
        "Peaceful and still",
        "Shellfish in chowder",
        "Letters delivered to your door",
        "Shopping center",
        "Boat fabric; travel by water",
        "Shut forcefully"
      ],
      5: [
        "Fake name used to hide identity",
        "School graduates",
        "Phone conversations; shouts",
        "Soothes; peaceful states",
        "Assert ownership of something",
        "Shellfish; slang for dollars",
        "Purple flowering spring shrub",
        "Fluffy South American animal",
        "Sends letters or packages",
        "Shopping centers",
        "Boat fabrics; travels by water",
        "Shuts doors forcefully",
        "Little in size"
      ],
      6: [
        "Hardened, thick patch of skin",
        "Asserts ownership",
        "Purple flowering spring shrubs",
        "Fluffy South American animals"
      ],
      7: [
        "Broadway show with singing and dancing (pangram!)"
      ],
      8: [
        "Broadway shows like Hamilton or Wicked (pangram!)"
      ]
    }
  },

  // PUZZLE 3: FLOWERS
  {
    id: 'flowers-puzzle',
    subtitle: 'Blooming at the Cafe',
    letters: ['F', 'L', 'O', 'W', 'E', 'R', 'S'],
    keyLetters: ['E', 'R'],
    totalWordCount: 45,
    words: {
      4: ['EWER', 'FORE', 'LEER', 'LORE', 'ORES', 'REEL', 'REEF', 'ROLE', 'ROSE', 'SERF', 'SERE', 'SORE', 'WERE', 'WORE'],
      5: ['EWERS', 'FEWER', 'FORES', 'FREER', 'FREES', 'LEERS', 'LORES', 'LOSER', 'LOWER', 'REELS', 'REEFS', 'RESEW', 'ROLES', 'ROSES', 'ROWER', 'SEERS', 'SERFS', 'SEWER', 'SORER', 'SWORE', 'WOOER', 'WORSE'],
      6: ['FLOWER', 'LOSERS', 'LOWERS', 'ROWERS', 'SEWERS', 'SLOWER', 'WOOERS'],
      7: ['FLOWERS', 'REFLOWS']
    },
    hints: {
      4: [
        "Decorative pitcher for water",
        "Front part; golf warning shout",
        "Stare",
        "Traditional knowledge and legends",
        "Rocks containing valuable metals",
        "Fishing spool; stagger dizzily",
        "Underwater coral formation",
        "Part played by an actor",
        "Classic red flower of love",
        "Medieval peasant worker",
        "Dried up and withered",
        "Painful and aching",
        "Past tense of \"are\"",
        "Had clothing on"
      ],
      5: [
        "Decorative water pitchers",
        "Smaller in number",
        "Golf warning shouts",
        "More free; less restricted",
        "Releases or liberates",
        "Stares",
        "Legends and traditional knowledge",
        "One who doesn't win",
        "Reduce; beneath something",
        "Fishing spools; staggers",
        "Coral formations underwater",
        "Stitch again",
        "Parts in a play or movie",
        "Classic flowers of love",
        "Person paddling a boat",
        "Fortune tellers; prophets",
        "Medieval peasant workers",
        "Underground drainage pipe",
        "More painful",
        "Made an oath; used bad words",
        "Someone courting a sweetheart",
        "More bad; not as good"
      ],
      6: [
        "Blooming plant in a garden",
        "Those who don't win",
        "Reduces; brings down",
        "People paddling boats",
        "Underground drainage pipes",
        "Less fast; more gradual",
        "People courting sweethearts"
      ],
      7: [
        "Blooming beauties in a garden (pangram!)",
        "Flows again, like melted wax"
      ]
    }
  },

  // PUZZLE 4: FRIENDS
  {
    id: 'friends-puzzle',
    subtitle: 'The One at the Cafe',
    letters: ['F', 'R', 'I', 'E', 'N', 'D', 'S'],
    keyLetters: ['I', 'E'],
    totalWordCount: 56,
    words: {
      4: ['DINE', 'DIRE', 'FINE', 'FIRE', 'IDES', 'NINE', 'REIN', 'RIDE', 'RIFE', 'RISE', 'SIDE', 'SINE', 'SIRE'],
      5: ['DINED', 'DINER', 'DINES', 'DRIED', 'DRIES', 'FINED', 'FINER', 'FINES', 'FIRED', 'FIRES', 'FRIED', 'FRIES', 'INDIE', 'INFER', 'INNER', 'REINS', 'RESIN', 'RIDER', 'RIDES', 'RINSE', 'RISEN', 'SIDED', 'SIDES', 'SIRED', 'SIREN', 'SNIDE'],
      6: ['DINERS', 'DRIERS', 'FINDER', 'FRIEND', 'INFERS', 'REFINE', 'REINED', 'RESIDE', 'RIDERS', 'RINSED', 'SIRENS'],
      7: ['FINDERS', 'FRIENDS', 'INSIDER', 'REFINED', 'REFINES', 'RESIDES'],
      8: ['INSIDERS']
    },
    hints: {
      4: [
        "Eat a meal, especially dinner",
        "Extremely serious or urgent",
        "Good quality; penalty fee",
        "Flames; to let go from a job",
        "Middle of the month (beware the _____ of March!)",
        "Number after eight",
        "Strap to control a horse",
        "Travel on a horse, bike, or roller coaster",
        "Widespread; full of",
        "Go upward; get out of bed",
        "Edge; to agree with someone",
        "Math function in trigonometry",
        "Father, especially of a horse"
      ],
      5: [
        "Ate a meal",
        "Restaurant with booths; person eating",
        "Eats meals",
        "Made dry; preserved",
        "Removes moisture",
        "Given a penalty fee",
        "Better quality; more delicate",
        "Penalty fees",
        "Let go from a job; shot a gun",
        "Flames; shoots",
        "Cooked in hot oil",
        "French _____; cooks in oil",
        "Independent film or music",
        "Conclude from evidence",
        "Inside; internal",
        "Straps to control a horse",
        "Sticky substance from trees",
        "Person on a horse or bike",
        "Travels on; amusement park attractions",
        "Wash lightly with water",
        "Gone up; out of bed",
        "Took a position with someone",
        "Edges; french fries or coleslaw",
        "Fathered offspring",
        "Warning sound; mythical sea singer",
        "Sarcastic in a mean way"
      ],
      6: [
        "Restaurants with booths",
        "Machines that remove moisture",
        "One who locates something lost",
        "Close companion you care about",
        "Concludes from evidence",
        "Make pure; improve",
        "Pulled back with horse straps",
        "Live in a place",
        "People on horses or bikes",
        "Washed lightly with water",
        "Warning sounds; mythical singers"
      ],
      7: [
        "People who locate lost things",
        "Close companions (pangram!)",
        "Someone with special inside knowledge",
        "Made pure; elegant and cultured",
        "Makes pure; improves",
        "Lives in a place"
      ],
      8: [
        "People with special inside knowledge"
      ]
    }
  },

  // PUZZLE 5: INVENTOR
  {
    id: 'inventor-puzzle',
    subtitle: "What's New?",
    letters: ['I', 'N', 'V', 'E', 'T', 'O', 'R'],
    keyLetters: ['O', 'E'],
    totalWordCount: 23,
    words: {
      4: ['NOTE', 'OVEN', 'OVER', 'ROTE', 'ROVE', 'TONE', 'TORE', 'VETO', 'VOTE'],
      5: ['NOTER', 'OVERT', 'ROVER', 'TENOR', 'TONER', 'TONNE', 'TROVE', 'VOTER'],
      6: ['INTONE', 'ORIENT', 'RETORT', 'ROTTEN'],
      7: ['ENVIRON'],
      8: ['INVENTOR']
    },
    hints: {
      4: [
        "Written message; musical sound",
        "Kitchen appliance for baking",
        "Above; finished",
        "Memorization by repetition",
        "Wander or roam about",
        "Sound quality; shade of color",
        "Ripped apart",
        "Reject or override a decision",
        "Cast a ballot in an election"
      ],
      5: [
        "One who writes things down",
        "Open and not hidden",
        "Wanderer; Mars explorer",
        "Male singing voice",
        "Printer ink; skin care product",
        "Metric ton (1,000 kg)",
        "Collection of treasures",
        "Person who casts a ballot"
      ],
      6: [
        "Chant; speak in a monotone",
        "The East; to position or align",
        "Quick, witty reply",
        "Decayed and spoiled"
      ],
      7: [
        "Surround or encircle"
      ],
      8: [
        "Creator of new things (pangram!)"
      ]
    }
  },

  // PUZZLE 6: PUZZLERS
  {
    id: 'puzzlers-puzzle',
    subtitle: 'Piecers of Wisdom',
    letters: ['P', 'U', 'Z', 'L', 'E', 'R', 'S'],
    keyLetters: ['U', 'E'],
    totalWordCount: 39,
    words: {
      4: ['LURE', 'PURE', 'RULE', 'RUES', 'RUSE', 'SURE', 'USER'],
      5: ['LURES', 'PULSE', 'PUREE', 'PURER', 'PURSE', 'RULES', 'RULER', 'RUSES', 'SUPER', 'SURER', 'UPPER', 'USERS'],
      6: ['PERUSE', 'PULSES', 'PUREES', 'PURSUE', 'PURSES', 'PUZZLE', 'RULERS', 'SUPPER', 'SUPPLE', 'UPPERS'],
      7: ['PERUSES', 'PURSUER', 'PURSUES', 'PUZZLER', 'PUZZLES', 'REPULSE', 'SUPPERS'],
      8: ['PURSUERS', 'PUZZLERS', 'REPULSES']
    },
    hints: {
      4: [
        "Temptation; fishing bait",
        "Clean and unmixed",
        "Regulation; to govern",
        "Regrets deeply",
        "Trick or deception",
        "Certain and confident",
        "Person who uses something"
      ],
      5: [
        "Temptations; fishing baits",
        "Heartbeat; rhythmic throb",
        "Blended smooth food",
        "More clean and unmixed",
        "Handbag; to pucker lips",
        "Regulations; governs",
        "Measuring stick; leader",
        "Tricks or deceptions",
        "Great; excellent",
        "More certain",
        "Higher part; top level",
        "People who use things"
      ],
      6: [
        "Read carefully and thoroughly",
        "Heartbeats; legumes like lentils",
        "Blended smooth foods",
        "Chase after; seek",
        "Handbags",
        "Brain teaser; jigsaw",
        "Measuring sticks; leaders",
        "Evening meal",
        "Flexible and bendable",
        "Top parts of shoes; stimulants"
      ],
      7: [
        "Reads carefully and thoroughly",
        "One who chases after someone",
        "Chases after; seeks",
        "One who solves brain teasers (pangram!)",
        "Brain teasers; jigsaws",
        "Drive back; disgust",
        "Evening meals"
      ],
      8: [
        "People who chase after others",
        "People who solve brain teasers (pangram!)",
        "Drives back; disgusts"
      ]
    }
  },

  // PUZZLE 7: PEANUTS
  {
    id: 'peanuts-puzzle',
    subtitle: 'Snack Attack',
    letters: ['P', 'E', 'A', 'N', 'U', 'T', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 45,
    words: {
      4: ['ANTE', 'APES', 'EASE', 'EATS', 'ETAS', 'NAPE', 'NEAT', 'PANE', 'PATE', 'PEAS', 'PEAT', 'SANE', 'SATE', 'SEAT', 'TAPE', 'TEAS'],
      5: ['ANTES', 'EATEN', 'NAPES', 'NEAPS', 'PANES', 'PASTE', 'PATES', 'PAUSE', 'PEATS', 'SATES', 'SAUTE', 'SEATS', 'STATE', 'TAPES', 'TASTE'],
      6: ['PASTES', 'PAUSES', 'PEANUT', 'SATEEN', 'SAUTES', 'SENATE', 'STATES', 'STATUE', 'TASTES'],
      7: ['APTNESS', 'PEANUTS', 'SENATES', 'STATUES'],
      8: ['PEASANTS']
    },
    hints: {
      4: [
        "Poker stake; put money in the pot",
        "Primates; imitates someone",
        "Comfort; make less difficult",
        "Consumes food",
        "Greek letters; estimated arrival times",
        "Back of the neck",
        "Tidy and organized",
        "Sheet of window glass",
        "Top of the head",
        "Small round green vegetables",
        "Soil used in gardening",
        "Mentally healthy and reasonable",
        "Satisfy fully",
        "Chair; place to sit",
        "Sticky strip; cassette recording",
        "Hot brewed beverages"
      ],
      5: [
        "Poker stakes; bets before dealing",
        "Consumed as food",
        "Backs of necks",
        "Tides with minimal change",
        "Sheets of window glass",
        "Glue; soft dough mixture",
        "Tops of heads",
        "Brief stop or break",
        "Types of gardening soil",
        "Satisfies fully",
        "Cook quickly in a pan",
        "Chairs; places to sit",
        "Condition; nation or territory",
        "Sticky strips; recordings",
        "Flavor; sample food"
      ],
      6: [
        "Glues; soft mixtures",
        "Brief stops or breaks",
        "Legume snack in a shell",
        "Glossy cotton fabric",
        "Cooks quickly in a pan",
        "Legislative governing body",
        "Conditions; nations or territories",
        "Sculpted figure of a person",
        "Flavors; samples food"
      ],
      7: [
        "Quality of being suitable",
        "Legume snacks at the ballpark (pangram!)",
        "Legislative governing bodies",
        "Sculpted figures"
      ],
      8: [
        "Farm workers; rural villagers"
      ]
    }
  },

  // PUZZLE 8: BAKERIES
  {
    id: 'bakeries-puzzle',
    subtitle: 'Cookies, Donuts, and Pastries, oh my!',
    letters: ['B', 'A', 'K', 'E', 'R', 'I', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 50,
    words: {
      4: ['BAKE', 'BARE', 'BASE', 'BEAK', 'BEAR', 'EASE', 'RAKE', 'SAKE', 'SEAR'],
      5: ['ABASE', 'AREAS', 'ARISE', 'BAKER', 'BAKES', 'BARES', 'BASES', 'BEAKS', 'BEARS', 'BRAKE', 'BREAK', 'ERASE', 'RAISE', 'RAKES', 'REARS', 'SABER', 'SAKES', 'SAREE', 'SEARS'],
      6: ['ABASES', 'BAKERS', 'BEAKER', 'BRAISE', 'BRAKES', 'BREAKS', 'EASIER', 'ERASER', 'ERASES', 'RABIES', 'RAISER', 'RAISES', 'SABERS', 'SAREES', 'SIERRA'],
      7: ['BEAKERS', 'BRAISES', 'BREAKER', 'ERASERS', 'RAISERS', 'SIERRAS'],
      8: ['BAKERIES', 'BREAKERS']
    },
    hints: {
      4: [
        "Cook in an oven",
        "Uncovered; naked",
        "Bottom; foundation",
        "Bird's bill",
        "Large furry animal; to carry",
        "Comfort; make less difficult",
        "Garden tool for gathering leaves",
        "Purpose; Japanese rice wine",
        "Burn the surface; scorch"
      ],
      5: [
        "Humble or degrade oneself",
        "Regions; spaces",
        "Get up; come into being",
        "Person who makes bread and pastries",
        "Cooks in an oven",
        "Uncovers; exposes",
        "Foundations; baseball spots",
        "Bird bills",
        "Large furry animals; carries",
        "Stopping device on a vehicle",
        "Shatter; pause from work",
        "Delete; remove marks",
        "Lift up; increase",
        "Garden tools; gathers leaves",
        "Back parts; raises up",
        "Curved sword",
        "Purposes",
        "Traditional Indian wrapped garment",
        "Burns surfaces"
      ],
      6: [
        "Humbles or degrades",
        "People who make bread and pastries",
        "Glass container used in labs",
        "Cook slowly in liquid",
        "Stopping devices on vehicles",
        "Shatters; pauses from work",
        "Less difficult",
        "Tool for removing pencil marks",
        "Deletes; removes marks",
        "Viral disease from animal bites",
        "One who lifts or increases",
        "Lifts up; increases",
        "Curved swords",
        "Traditional Indian garments",
        "Mountain range"
      ],
      7: [
        "Glass containers used in labs",
        "Cooks slowly in liquid",
        "Ocean wave; circuit safety device",
        "Tools for removing marks",
        "People who lift or increase",
        "Mountain ranges"
      ],
      8: [
        "Shops selling bread and pastries (pangram!)",
        "Ocean waves; circuit safety devices"
      ]
    }
  },

  // PUZZLE 9: APPRECIATE
  {
    id: 'appreciate-puzzle',
    subtitle: 'Thank You!',
    letters: ['A', 'P', 'R', 'E', 'C', 'I', 'T'],
    keyLetters: ['A', 'E'],
    totalWordCount: 37,
    words: {
      4: ['ACRE', 'CAPE', 'CARE', 'PACE', 'PARE', 'PATE', 'RACE', 'RARE', 'RATE', 'REAP', 'TAPE', 'TARE'],
      5: ['CAPER', 'CARET', 'CARTE', 'CATER', 'CRATE', 'EATER', 'IRATE', 'PACER', 'PARER', 'PEACE', 'PRATE', 'RACER', 'REACT', 'RECAP', 'TAPER', 'TRACE'],
      6: ['APIECE', 'CARPET', 'CREATE', 'PIRATE', 'RACIER', 'RAPIER', 'REPEAT', 'TRACER'],
      10: ['APPRECIATE']
    },
    hints: {
      4: [
        "Unit of land measurement",
        "Sleeveless cloak; coastal point",
        "Concern; look after someone",
        "Speed of movement; step",
        "Peel or trim with a knife",
        "Top of the head",
        "Competition; run fast",
        "Uncommon; lightly cooked steak",
        "Speed; evaluate or rank",
        "Harvest crops",
        "Sticky strip; recording medium",
        "Weed; weight of a container"
      ],
      5: [
        "Playful jump; edible flower bud",
        "Editing symbol that looks like ^",
        "Menu; as in \"à la _____\"",
        "Provide food for an event",
        "Wooden shipping box",
        "One who consumes food",
        "Very angry",
        "One who walks back and forth; horse breed",
        "Tool for peeling fruit",
        "Calm; absence of war",
        "Talk foolishly at length",
        "One who competes in speed contests",
        "Respond to something",
        "Summarize what happened",
        "Narrow gradually; thin candle",
        "Track; small amount"
      ],
      6: [
        "Each one; per item",
        "Floor covering; call on the _____",
        "Make something new",
        "Sea robber; illegal copier",
        "More risqué or suggestive",
        "Thin, pointed sword",
        "Do or say again",
        "One who tracks; glowing bullet"
      ],
      10: [
        "Value highly; be grateful for (pangram!)"
      ]
    }
  },

  // PUZZLE 10: ANIMATES
  {
    id: 'animates-puzzle',
    subtitle: 'Coming to Life!',
    letters: ['A', 'N', 'I', 'M', 'T', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 32,
    words: {
      4: ['ANTE', 'EASE', 'EATS', 'MANE', 'MATE', 'MEAN', 'MEAT', 'NAME', 'NEAT', 'SAME', 'SANE', 'SATE', 'SEAT', 'SEAM', 'TAME', 'TEAM', 'TEAS'],
      5: ['ANTES', 'EATEN', 'INANE', 'MANES', 'MATES', 'MATTE', 'MEANS', 'MEATS', 'NAMES', 'SEAMS', 'SEATS', 'STEAM', 'TAMES', 'TEAMS'],
      6: ['STAMEN'],
      7: ['ANIMATE'],
      8: ['ANIMATES']
    },
    hints: {
      4: [
        "Poker stake; put money in the pot",
        "Comfort; make less difficult",
        "Consumes food",
        "Lion's flowing neck hair",
        "Friend; partner; chess ending",
        "Unkind; or an average",
        "Animal flesh used for food",
        "What you're called",
        "Tidy and organized",
        "Identical; not different",
        "Mentally healthy and reasonable",
        "Satisfy fully",
        "Chair; place to sit",
        "Line where two fabrics are sewn together",
        "Not wild; gentle and docile",
        "Group working together",
        "Hot brewed beverages"
      ],
      5: [
        "Poker stakes; bets before dealing",
        "Consumed as food",
        "Silly and meaningless",
        "Lions' flowing neck hair",
        "Friends; partners",
        "Dull finish; not shiny",
        "Methods; or is unkind",
        "Animal flesh foods",
        "What people are called",
        "Lines where fabrics join",
        "Chairs; places to sit",
        "Water vapor; or cook with vapor",
        "Makes gentle and docile",
        "Groups working together"
      ],
      6: [
        "Flower part that produces pollen"
      ],
      7: [
        "Bring to life; lively and energetic (pangram!)",
      ],
      8: [
        "Brings to life; makes lively (pangram!)"
      ]
    }
  },

// PUZZLE 11: SERVING
  {
    id: 'serving-puzzle',
    subtitle: 'At Your Service',
    letters: ['S', 'E', 'R', 'V', 'I', 'N', 'G'],
    keyLetters: ['E', 'R'],
    totalWordCount: 39,
    words: {
      4: ['ERGS', 'EVER', 'IRES', 'REIN', 'REVS', 'RISE', 'SEER', 'SERE', 'VEER'],
      5: ['GIVER', 'VEERS', 'REIGN', 'REINS', 'RESIN', 'RINSE', 'RISEN', 'RISER', 'RIVER', 'SEERS', 'SERVE', 'SEVER', 'SIREN', 'VERSE'],
      6: ['GIVERS', 'REIGNS', 'RESIGN', 'RISERS', 'RIVERS', 'SERVER', 'SEVERS', 'SINGER', 'SIRENS', 'VERGES'],
      7: ['SERVING', 'SERVERS', 'SINGERS', 'VERSING'],
      8: ['SERVINGS', 'SEVERING']
    },
    hints: {
      4: [
        "Units of energy in physics",
        "At any time; always",
        "Angers or irritates",
        "Strap to control a horse",
        "Engine sounds; speeds up",
        "Go upward; get out of bed",
        "Fortune teller; prophet",
        "Dried up and withered",
        "Change direction suddenly"
      ],
      5: [
        "One who donates or presents gifts",
        "Changes direction suddenly",
        "Rule as king or queen",
        "Straps to control a horse",
        "Sticky substance from trees",
        "Wash lightly with water",
        "Gone up; out of bed",
        "Early bird; stair part",
        "Flowing body of water",
        "Fortune tellers; prophets",
        "Wait on customers; tennis start",
        "Cut off completely",
        "Warning sound; mythical sea singer",
        "Lines of poetry"
      ],
      6: [
        "People who donate or present gifts",
        "Rules as royalty",
        "Quit a job formally",
        "Early birds; stair parts",
        "Flowing bodies of water",
        "Waiter; restaurant worker; computer that hosts",
        "Cuts off completely",
        "Person who performs songs vocally",
        "Warning sounds; mythical sea singers",
        "Edges; borders; is on the brink of"
      ],
      7: [
        "Portion of food; helping others (pangram!)",
        "Waiters; computers that host websites",
        "People who perform songs vocally",
        "Competing against in a match"
      ],
      8: [
        "Portions of food; helpings (pangram!)",
        "Cutting off completely"
      ]
    }
  },
  
  // PUZZLE 12: PICTURE
  {
    id: 'picture-puzzle',
    subtitle: 'Worth a Thousand Words',
    letters: ['P', 'I', 'C', 'T', 'U', 'R', 'E'],
    keyLetters: ['E', 'R'],
    totalWordCount: 31,
    words: {
      4: ['CURE', 'PIER', 'PURE', 'RICE', 'RIPE', 'RITE', 'TIER', 'TIRE', 'TREE', 'TRUE'],
      5: ['CREPT', 'CRIER', 'CURER', 'CUTER', 'ERUPT', 'PETER', 'PRICE', 'PRIER', 'RIPER', 'TRICE', 'TRIER', 'TRIPE', 'TRUER', 'RECUR', 'TRUCE'],
      6: ['PRICER', 'RECIPE', 'RECITE', 'TRICEP'],
      7: ['PICTURE', 'PIERCER', 'RECEIPT', 'RECITER']
    },
    hints: {
      4: [
        "Heal; remedy for illness",
        "Dock; walkway extending over water",
        "Clean and unmixed",
        "Grain often served with stir-fry",
        "Ready to eat; mature",
        "Ceremony or ritual",
        "Level or layer, like on a cake",
        "Rubber wheel covering; grow weary",
        "Woody plant with trunk and branches",
        "Correct; accurate; faithful"
      ],
      5: [
        "Moved slowly and stealthily",
        "Town announcer; one who weeps",
        "One who heals or preserves",
        "More adorable",
        "Explode; burst out suddenly",
        "Fade away gradually; a man's name",
        "Cost; what you pay",
        "One who pries into others' business",
        "More ready to eat; more mature",
        "A moment; in a _____",
        "One who attempts; one who tries",
        "Stomach lining meat; also means nonsense",
        "More accurate; more correct",
        "Happen again; occur repeatedly",
        "Ceasefire; temporary peace agreement"
      ],
      6: [
        "One who determines costs",
        "Cooking instructions for a dish",
        "Speak aloud from memory",
        "Arm muscle at back of upper arm"
      ],
      7: [
        "Photo; image; movie (pangram!)",
        "One who makes holes in ears or skin",
        "Proof of purchase; sales slip",
        "One who speaks aloud from memory"
      ]
    }
  },

  // PUZZLE 13: PANCAKES
  {
    id: 'pancakes-puzzle',
    subtitle: 'Griddle Me This',
    letters: ['P', 'A', 'N', 'C', 'K', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 40,
    words: {
      4: ['ACES', 'ACNE', 'APES', 'CAKE', 'CANE', 'CAPE', 'CASE', 'EASE', 'NAPE', 'PACE', 'PANE', 'PEAK', 'PEAS', 'SAKE', 'SANE'],
      5: ['CAKES', 'CANES', 'CAPES', 'CASES', 'CEASE', 'NAPES', 'PACES', 'PANES', 'PEAKS', 'PECAN', 'SAKES', 'SNAKE', 'SNEAK', 'SPACE', 'SPEAK'],
      6: ['CANAPE', 'ESCAPE', 'PECANS', 'SNEAKS', 'SPACES', 'SPEAKS'],
      7: ['CANAPES', 'ESCAPES', 'PANCAKE'],
      8: ['PANCAKES']
    },
    hints: {
      4: [
        "Top cards in a deck; experts",
        "Skin condition with pimples",
        "Primates; imitates",
        "Sweet layered birthday dessert",
        "Walking stick; sugar source plant",
        "Sleeveless superhero cloak",
        "Container; instance or example",
        "Comfort; make less difficult",
        "Back of the neck",
        "Speed of walking; a single step",
        "Sheet of window glass",
        "Mountain top; highest point",
        "Small round green vegetables",
        "Purpose; for the _____ of",
        "Mentally sound; rational"
      ],
      5: [
        "Birthday desserts with candles",
        "Walking sticks; sugar plants",
        "Superhero cloaks",
        "Containers; instances",
        "Stop; come to an end",
        "Backs of necks",
        "Walking speeds; steps",
        "Window glass sheets",
        "Mountain tops",
        "Nut used in pie",
        "Purposes; reasons",
        "Slithering reptile",
        "Move quietly and secretly",
        "Outer _____; room to move",
        "Talk; say words aloud"
      ],
      6: [
        "Small appetizer on bread or cracker",
        "Get away; break free",
        "Nuts often used in pralines",
        "Moves quietly and secretly",
        "Rooms; areas; gaps",
        "Talks; says words aloud"
      ],
      7: [
        "Small appetizers on bread",
        "Gets away; breaks free",
        "Flat breakfast cake cooked on a griddle (pangram!)"
      ],
      8: [
        "Flat breakfast cakes with syrup (pangram!)"
      ]
    }
  },

  // PUZZLE 14: GRIDDLES
  {
    id: 'griddles-puzzle',
    subtitle: 'Cooking Up Words',
    letters: ['G', 'R', 'I','D', 'L', 'E', 'S'],
    keyLetters: ['E', 'R'],
    totalWordCount: 47,
    words: {
      4: ['DIRE', 'ERGS', 'IRED', 'IRES', 'LEER', 'LIRE', 'REDS', 'REEL', 'RIDE', 'RILE', 'RISE', 'SEER', 'SERE', 'SIRE'],
      5: ['DIRGE', 'DRIER', 'ELDER', 'GREED', 'IDLER', 'LEERS', 'REELS', 'RIDER', 'RIDGE', 'RILED', 'RILES', 'RISER', 'SEERS', 'SIRED'],
      6: ['DRIERS', 'ELDERS', 'GILDER', 'GIRDLE', 'GLIDER', 'IDLERS', 'REDDER', 'RIDDLE', 'RIDGES', 'RIDERS', 'RISERS', 'SLIDER'],
      7: ['GIRDLES', 'GILDERS', 'GLIDERS', 'GRIDDLE', 'RIDDLES', 'SLIDERS'],
      8: ['GRIDDLES']
    },
    hints: {
      4: [
        "Extremely serious; urgent",
        "Units of energy in physics",
        "Made angry; annoyed",
        "Angers; annoys",
        "Stare in a creepy way",
        "Former Italian currency",
        "Crimson colors; wine types",
        "Fishing line spool; stagger back",
        "Travel on horseback or in a car",
        "Annoy; stir up",
        "Go upward; get out of bed",
        "Prophet; one who foresees",
        "Dried up; withered",
        "Father; address to a king"
      ],
      5: [
        "Slow, mournful funeral song",
        "More arid; laundry appliance",
        "Older and wiser person; tree type",
        "Excessive desire for wealth",
        "Lazy person; one who loafs",
        "Stares in a creepy way",
        "Fishing spools; staggers",
        "One who rides horses or bikes",
        "Mountain crest; raised line",
        "Annoyed; stirred up",
        "Annoys; stirs up",
        "Early bird; stair step part",
        "Prophets; fortune tellers",
        "Fathered; begot"
      ],
      6: [
        "Laundry appliances; more arid ones",
        "Older people; church leaders",
        "One who applies gold leaf",
        "Belt; shaping undergarment",
        "Aircraft without an engine",
        "Lazy people; loafers",
        "More crimson in color",
        "Puzzle with a clever answer",
        "Mountain crests; raised lines",
        "Horseback travelers; cyclists",
        "Early birds; stair step parts",
        "Small hamburgers; playground equipment"
      ],
      7: [
        "Belts; shaping undergarments",
        "Workers who apply gold leaf",
        "Engineless aircraft",
        "Flat cooking surface (pangram!)",
        "Puzzles with clever answers",
        "Small hamburgers; playground items"
      ],
      8: [
        "Flat cooking surfaces at diners (pangram!)"
      ]
    }
  },

  // PUZZLE 15: NOTEBOOKS
  {
    id: 'notebooks-puzzle',
    subtitle: 'Write It Down',
    letters: ['N', 'O', 'T', 'E', 'B', 'K', 'S'],
    keyLetters: ['E', 'O'],
    totalWordCount: 28,
    words: {
      4: ['BONE', 'EONS', 'KENO', 'NOES', 'NOSE', 'NOTE', 'OBOE', 'ONES', 'TOES', 'TONE'],
      5: ['BESOT', 'BONES', 'NOTES', 'OBOES', 'ONSET', 'STENO', 'STOKE', 'STONE', 'TOKEN', 'TONES'],
      6: ['BESOTS', 'BETOOK', 'STENOS', 'STOKES', 'STONES', 'TOKENS'],
      7: ['NOTEBOOK'],
      8: ['NOTEBOOKS']
    },
    hints: {
      4: [
        "Skeleton part; study hard",
        "Very long time periods",
        "Lottery-style gambling game",
        "Refusals; negative votes",
        "Facial feature for smelling",
        "Written message; observe",
        "Double-reed woodwind instrument",
        "Single units; individuals",
        "Foot digits",
        "Sound quality; muscle firmness"
      ],
      5: [
        "Make foolish with infatuation",
        "Skeleton parts; studies hard",
        "Written messages; observes",
        "Double-reed woodwind instruments",
        "Beginning; start of something",
        "Shorthand typist",
        "Feed a fire; stir up",
        "Rock; fruit seed",
        "Arcade coin; symbol; keepsake",
        "Sound qualities; shades of color"
      ],
      6: [
        "Makes foolish with infatuation",
        "Past tense of betake; went",
        "Shorthand typists",
        "Feeds fires; stirs up",
        "Rocks; fruit seeds",
        "Arcade coins; symbols; keepsakes"
      ],
      7: [
        "Bound pad for writing (pangram!)"
      ],
      8: [
        "Bound pads for writing (pangram!)"
      ]
    }
  },

  // PUZZLE 16: CANDLES
  {
    id: 'candles-puzzle',
    subtitle: 'A Warm Glow',
    letters: ['C', 'A', 'N', 'D', 'L', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 61,
    words: {
      4: ['ACES', 'ACNE', 'ALES', 'CANE', 'CASE', 'DALE', 'DEAL', 'DEAN', 'EASE', 'ELAN', 'LACE', 'LANE', 'LEAD', 'LEAN', 'SALE', 'SANE', 'SEAL'],
      5: ['CANED', 'CANES', 'CASES', 'CEASE', 'CLEAN', 'DALES', 'DANCE', 'DEALS', 'DEANS', 'DECAL', 'EASEL', 'LACED', 'LACES', 'LADEN', 'LANCE', 'LANES', 'LEADS', 'LEANS', 'LEASE', 'SALES', 'SCALE', 'SEALS', 'SEDAN'],
      6: ['ASCEND', 'CANDLE', 'CLEANS', 'DANCES', 'DECALS', 'EASELS', 'LANCED', 'LANCES', 'LEADEN', 'LEANED', 'LEASED', 'LEASES', 'SCALED', 'SCALES', 'SEALED', 'SEDANS'],
      7: ['ASCENDS', 'CANDLES', 'CLEANED', 'ENCASED'],
      8: ['ASCENDED']
    },
    hints: {
      4: [
        "Top cards in a deck; experts",
        "Skin condition with pimples",
        "Types of beer",
        "Walking stick; sugar plant",
        "Container; instance",
        "Valley; glen",
        "Agreement; distribute cards",
        "School administrator",
        "Comfort; lack of difficulty",
        "Enthusiasm; stylish flair",
        "Delicate fabric; shoe ties",
        "Narrow road; bowling path",
        "Go first; heavy metal",
        "Thin; tilt to one side",
        "Discount event at a store",
        "Mentally sound; rational",
        "Ocean mammal; close tightly"
      ],
      5: [
        "Hit with a walking stick",
        "Walking sticks; sugar plants",
        "Containers; instances",
        "Stop; come to an end",
        "Free from dirt; tidy up",
        "Valleys; glens",
        "Move to music",
        "Agreements; distributes cards",
        "School administrators",
        "Decorative sticker",
        "Art stand for painting",
        "Tied with delicate fabric",
        "Delicate fabrics; shoe ties",
        "Heavily loaded; burdened",
        "Long spear; pierce to drain",
        "Narrow roads; bowling paths",
        "Goes first; heavy metals",
        "Tilts to one side",
        "Rental agreement",
        "Discount events at stores",
        "Weighing device; climb up",
        "Ocean mammals; closes tightly",
        "Four-door car"
      ],
      6: [
        "Climb upward; go up",
        "Wax stick that burns (pangram!)",
        "Tidies up; makes spotless",
        "Moves to music",
        "Decorative stickers",
        "Art stands for painting",
        "Pierced with a spear",
        "Long spears",
        "Heavy like metal; dull gray",
        "Tilted to one side",
        "Rented out",
        "Rental agreements",
        "Climbed up; weighed",
        "Weighing devices; climbs up",
        "Closed tightly",
        "Four-door cars"
      ],
      7: [
        "Climbs upward; goes up",
        "Wax sticks that burn (pangram!)",
        "Tidied up; made spotless",
        "Enclosed; surrounded",
      ],
      8: [
        "Climbed upward; went up",
      ]
    }
  },

  // PUZZLE 17: SPARKLE
  {
    id: 'sparkle-puzzle',
    subtitle: 'All That Glitters',
    letters: ['S', 'P', 'A', 'R', 'K', 'L', 'E'],
    keyLetters: ['A', 'E'],
    totalWordCount: 90,
    words: {
      4: ['APES', 'AREA', 'EARL', 'EARS', 'EASE', 'ERAS', 'KALE', 'LAKE', 'LEAK', 'LEAP', 'PALE', 'PARE', 'PEAK', 'PEAL', 'PEAR', 'PEAS', 'RAKE', 'RARE', 'REAL', 'REAP', 'SAKE', 'SALE', 'SEAL', 'SEAR'],
      5: ['APERS', 'AREAS', 'EARLS', 'EASEL', 'ERASE', 'KALES', 'LAKES', 'LAPSE', 'LASER', 'LEAKS', 'LEAPS', 'LEASE', 'PALER', 'PALES', 'PAPER', 'PARES', 'PARSE', 'PEAKS', 'PEALS', 'PEARL', 'PEARS', 'PLEAS', 'RAKES', 'REALS', 'REAPS', 'SALES', 'SEALS', 'SEARS', 'SPARE', 'SPEAK', 'SPEAR'],
      6: ['ASLEEP', 'EASELS', 'ERASER', 'ERASES', 'LAPELS', 'LAPSES', 'LASERS', 'LEAPER', 'LEASES', 'PAPERS', 'PARSES', 'PEARLS', 'PEELER', 'PLEASE', 'RESALE', 'SEALER', 'SPARES', 'SPEAKS', 'SPEARS'],
      7: ['ERASERS', 'LEAPERS', 'PEELERS', 'PLEASER', 'RELAPSE', 'REPEALS', 'RESALES', 'SEALERS', 'SPARKLE', 'SPEAKER'],
      8: ['PLEASERS', 'RELAPSES', 'SPARKLER', 'SPARKLES', 'SPEAKERS'],
      9: ['SPARKLERS']
    },
    hints: {
      4: [
        "Primates; imitates",
        "Region; surface space",
        "British nobleman",
        "Hearing organs",
        "Comfort; lack of difficulty",
        "Historical time periods",
        "Leafy green superfood",
        "Body of water",
        "Drip through a hole",
        "Jump; spring forward",
        "Light in color; fence stake",
        "Peel; trim away",
        "Mountain top; highest point",
        "Ring out like bells",
        "Fruit related to apples",
        "Small green vegetables",
        "Garden tool for leaves",
        "Uncommon; cooked lightly",
        "Genuine; actual",
        "Harvest; gather crops",
        "Purpose; for the _____ of",
        "Discount event",
        "Ocean mammal; close tightly",
        "Burn the surface; scorch"
      ],
      5: [
        "Those who imitate",
        "Regions; surface spaces",
        "British noblemen",
        "Art stand for painting",
        "Remove; rub out",
        "Leafy green superfoods",
        "Bodies of water",
        "Slip; temporary failure",
        "Focused light beam device",
        "Drips through holes",
        "Jumps; springs forward",
        "Rental agreement",
        "More light in color",
        "Fence stakes; light colors",
        "Writing material; newspaper",
        "Peels; trims away",
        "Analyze grammatically",
        "Mountain tops",
        "Rings out like bells",
        "Gem from an oyster",
        "Fruits related to apples",
        "Requests; appeals",
        "Garden tools for leaves",
        "Genuine things; currency",
        "Harvests; gathers crops",
        "Discount events",
        "Ocean mammals",
        "Burns the surface",
        "Extra; additional",
        "Talk; say words",
        "Weapon; throw a javelin"
      ],
      6: [
        "Sleeping; not awake",
        "Art stands for painting",
        "Rubber for removing pencil marks",
        "Removes; rubs out",
        "Jacket flaps; collar folds",
        "Slips; temporary failures",
        "Focused light beam devices",
        "One who jumps",
        "Rental agreements",
        "Writing materials; newspapers",
        "Analyzes grammatically",
        "Gems from oysters",
        "Potato skin remover",
        "Make happy; say 'pretty _____'",
        "Secondhand sale",
        "One who closes tightly",
        "Extras; additional ones",
        "Talks; says words",
        "Weapons; throws javelins"
      ],
      7: [
        "Rubber tools for removing marks",
        "Those who jump",
        "Potato skin removers",
        "One who makes others happy",
        "Fall back into old habits",
        "Revokes; takes back laws",
        "Secondhand sales",
        "Those who close tightly",
        "Glitter; shine brightly (pangram!)",
        "One who talks; audio device"
      ],
      8: [
        "Those who make others happy",
        "Falls back into old habits",
        "Handheld firework (pangram!)",
        "Glitters; shines brightly (pangram!)",
        "Those who talk; audio devices"
      ],
      9: [
        "Handheld fireworks (pangram!)"
      ]
    }
  },

  // PUZZLE 18: GARDENS
  {
    id: 'gardens-puzzle',
    subtitle: 'In Full Bloom',
    letters: ['G', 'A', 'R', 'D', 'E', 'N', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 55,
    words: {
      4: ['AGED', 'AGES', 'DARE', 'DEAN', 'DEAR', 'EARS', 'EARN', 'EASE', 'ERAS', 'GEAR', 'NEAR', 'RAGE', 'READ', 'SAGE', 'SANE', 'SEAR'],
      5: ['ANGER', 'DARES', 'DEANS', 'DEARS', 'EARED', 'EARNS', 'EASED', 'GEARS', 'GRADE', 'NEARS', 'RAGES', 'RANGE', 'READS', 'SAGES', 'SANER', 'SEARS', 'SNARE'],
      6: ['ANGERS', 'DANGER', 'DARNED', 'GANDER', 'GARDEN', 'GEARED', 'GRADES', 'RANGED', 'RANGER', 'RANGES', 'SANDER', 'SNARED', 'SNARES'],
      7: ['DANGERS', 'GANDERS', 'GARDENS', 'GRENADE', 'RANGERS', 'SANDERS'],
      8: ['GARDENER', 'GRENADES'],
      9: ['GARDENERS']
    },
    hints: {
      4: [
        "Grew older; matured",
        "Grows older; time periods",
        "Challenge someone; be bold",
        "School administrator",
        "Beloved; expensive",
        "Hearing organs",
        "Make money; deserve",
        "Comfort; lack of difficulty",
        "Historical time periods",
        "Mechanical cog; equipment",
        "Close by; not far",
        "Intense anger; fury",
        "Look at written words",
        "Wise person; herb",
        "Mentally sound; rational",
        "Burn the surface; scorch"
      ],
      5: [
        "Strong feeling of annoyance",
        "Challenges; acts boldly",
        "School administrators",
        "Beloved ones; letters starting with 'Dear'",
        "Having ears; listened",
        "Makes money; deserves",
        "Made more comfortable",
        "Mechanical cogs; equipment",
        "School mark; slope level",
        "Comes close to",
        "Intense angers; furies",
        "Span; mountain chain",
        "Looks at written words",
        "Wise people; herbs",
        "More rational; more sound",
        "Burns surfaces; scorches",
        "Trap for catching animals"
      ],
      6: [
        "Strong feelings of annoyance",
        "Threat; peril",
        "Mild curse word; mended socks",
        "Male goose; take a look",
        "Plot for growing plants (pangram!)",
        "Equipped; prepared",
        "School marks; slope levels",
        "Varied; roamed over",
        "Park protector; forest guide",
        "Spans; mountain chains",
        "Power tool for smoothing wood",
        "Caught in a trap",
        "Traps for catching animals"
      ],
      7: [
        "Threats; perils",
        "Male geese; takes a look",
        "Plots for growing plants (pangram!)",
        "Explosive weapon",
        "Park protectors; forest guides",
        "Power tools for smoothing wood"
      ],
      8: [
        "One who tends plants (pangram!)",
        "Explosive weapons"
      ],
      9: [
        "Those who tend plants (pangram!)"
      ]
    }
  },

  // PUZZLE 19: SCRABBLE
  {
    id: 'scrabble-puzzle',
    subtitle: 'Letter Perfect!',
    letters: ['S', 'C', 'R', 'A', 'B', 'B', 'L', 'E'],
    keyLetters: ['A', 'E'],
    totalWordCount: 71,
    words: {
      4: ['ABLE', 'ACES', 'ACRE', 'ALES', 'AREA', 'BABE', 'BARE', 'BASE', 'BEAR', 'CARE', 'CASE', 'EARL', 'EARS', 'EASE', 'ERAS', 'LACE', 'RACE', 'REAL', 'SALE', 'SEAL', 'SEAR'],
      5: ['ABLER', 'ACRES', 'AREAS', 'BABES', 'BALES', 'BARES', 'BASES', 'BEARS', 'BLARE', 'BRACE', 'CABLE', 'CARES', 'CASES', 'CEASE', 'CLEAR', 'EARLS', 'EASEL', 'ERASE', 'LACES', 'LASER', 'RACER', 'RACES', 'REALS', 'SABER', 'SALES', 'SCALE', 'SCARE', 'SEALS', 'SEARS'],
      6: ['BLARES', 'BRACES', 'CABLES', 'CEREAL', 'CLEARS', 'EASELS', 'ERASER', 'ERASES', 'LASERS', 'RACERS', 'RESALE', 'SABERS', 'SCALES', 'SCARES', 'SEALER'],
      7: ['CEREALS', 'ERASERS', 'RESALES', 'SEALERS'],
      8: ['SCRABBLE'],
      9: ['SCRABBLES']
    },
    hints: {
      4: [
        "Capable; having skill",
        "Top cards; experts",
        "Land measurement; plot",
        "Types of beer",
        "Region; surface space",
        "Infant; dear one",
        "Uncovered; naked",
        "Bottom; foundation",
        "Large mammal; endure",
        "Be concerned; look after",
        "Container; instance",
        "British nobleman",
        "Hearing organs",
        "Comfort; lack of difficulty",
        "Historical time periods",
        "Delicate fabric; shoe ties",
        "Competition; run fast",
        "Genuine; actual",
        "Discount event",
        "Ocean mammal; close tightly",
        "Burn the surface; scorch"
      ],
      5: [
        "More capable",
        "Land measurements; plots",
        "Regions; surface spaces",
        "Infants; dear ones",
        "Bundles of hay",
        "Uncovers; exposes",
        "Foundations; bottoms",
        "Large mammals; endures",
        "Loud sound; honk",
        "Support device; prepare for impact",
        "Thick wire; TV cord",
        "Is concerned; looks after",
        "Containers; instances",
        "Stop; come to an end",
        "Transparent; obvious",
        "British noblemen",
        "Art stand for painting",
        "Remove; rub out",
        "Delicate fabrics; shoe ties",
        "Focused light beam device",
        "One who competes in speed",
        "Competitions; runs fast",
        "Genuine things; currency",
        "Curved sword",
        "Discount events",
        "Weighing device; climb up",
        "Frighten; startle",
        "Ocean mammals",
        "Burns surfaces; scorches"
      ],
      6: [
        "Loud sounds; honks",
        "Support devices; dental gear",
        "Thick wires; TV cords",
        "Breakfast grain food",
        "Makes transparent; removes obstacles",
        "Art stands for painting",
        "Rubber for removing pencil marks",
        "Removes; rubs out",
        "Focused light beam devices",
        "Those who compete in speed",
        "Secondhand sale",
        "Curved swords",
        "Weighing devices; climbs up",
        "Frightens; startles",
        "One who closes tightly"
      ],
      7: [
        "Breakfast grain foods",
        "Rubber tools for removing marks",
        "Secondhand sales",
        "Those who close tightly"
      ],
      8: [
        "Word tile board game (pangram!)"
      ],
      9: [
        "Plays word tile games; scrambles (pangram!)"
      ]
    }
  },

  // PUZZLE 20: LIBRARIES
  {
    id: 'libraries-puzzle',
    subtitle: 'Check It Out',
    letters: ['L', 'I', 'B', 'R', 'A', 'R', 'I', 'E', 'S'],
    keyLetters: ['E', 'R'],
    totalWordCount: 54,
    words: {
      4: ['BARE', 'BEER', 'BRIE', 'EARL', 'EARS', 'ERRS', 'ERAS', 'IRES', 'LEER', 'REAL', 'REAR', 'RILE', 'RISE', 'SEAR', 'SEER', 'SIRE'],
      5: ['ABLER', 'ARISE', 'BARER', 'BARES', 'BEERS', 'BRIER', 'BRIES', 'EARLS', 'ERASE', 'LASER', 'LEERS', 'RAISE', 'RARER', 'REALS', 'REARS', 'RILES', 'RISER', 'SABER', 'SEERS', 'SIRES'],
      6: ['ARISES', 'BRIERS', 'EERIER', 'ERASER', 'IRISES', 'LASERS', 'RAISER', 'RAISES', 'RISERS', 'SABERS', 'SEALER', 'SERIAL', 'SIERRA'],
      7: ['ERASERS', 'RAISERS', 'SEALERS', 'SERIALS', 'SIERRAS'],
      9: ['LIBRARIES']
    },
    hints: {
      4: [
        "Uncovered; naked",
        "Alcoholic drink from hops",
        "Soft French cheese",
        "British nobleman",
        "Hearing organs",
        "Makes mistakes",
        "Historical time periods",
        "Angers; annoys",
        "Stare in a creepy way",
        "Genuine; actual",
        "Back part; raise up",
        "Annoy; stir up",
        "Go upward; get out of bed",
        "Burn the surface; scorch",
        "Prophet; one who foresees",
        "Father; address to a king"
      ],
      5: [
        "More capable",
        "Get up; come into being",
        "More uncovered",
        "Uncovers; exposes",
        "Alcoholic drinks from hops",
        "Thorny shrub",
        "Soft French cheeses",
        "British noblemen",
        "Remove; rub out",
        "Focused light beam device",
        "Stares in a creepy way",
        "Lift up; increase",
        "More uncommon",
        "Genuine things; currency",
        "Back parts; raises up",
        "Annoys; stirs up",
        "Early bird; stair step part",
        "Curved sword",
        "Prophets; fortune tellers",
        "Fathers; addresses to kings"
      ],
      6: [
        "Gets up; comes into being",
        "Thorny shrubs",
        "More creepy; more unsettling",
        "Rubber for removing pencil marks",
        "Flowers; parts of eyes",
        "Focused light beam devices",
        "One who lifts or increases",
        "Lifts up; increases",
        "Early birds; stair step parts",
        "Curved swords",
        "One who closes tightly",
        "Ongoing story; in sequence",
        "Mountain range; type of mist"
      ],
      7: [
        "Rubber tools for removing marks",
        "Those who lift or increase",
        "Those who close tightly",
        "Ongoing stories; TV series",
        "Mountain ranges"
      ],
      9: [
        "Buildings full of books (pangram!)"
      ]
    }
  }
];

// Get yesterday's puzzle dynamically based on rotation
export function getTodaysPuzzle() {
  const ANCHOR_DATE = new Date('2026-01-19T07:00:00-05:00');
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  const hour = estTime.getHours();
  const puzzleDate = new Date(estTime);
  
  if (hour < 7) {
    puzzleDate.setDate(puzzleDate.getDate() - 1);
    puzzleDate.setHours(7, 0, 0, 0);
  } else {
    puzzleDate.setHours(7, 0, 0, 0);
  }
  
  const daysSinceAnchor = Math.floor((puzzleDate - ANCHOR_DATE) / (1000 * 60 * 60 * 24));
  const puzzleIndex = ((daysSinceAnchor % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  
  return PUZZLES[puzzleIndex];
}

function getYesterdaysPuzzle() {
 const ANCHOR_DATE = new Date('2026-01-19T07:00:00-05:00');
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  const hour = estTime.getHours();
  const puzzleDate = new Date(estTime);
  
  if (hour < 7) {
    puzzleDate.setDate(puzzleDate.getDate() - 2);
  } else {
    puzzleDate.setDate(puzzleDate.getDate() - 1);
  }
  puzzleDate.setHours(7, 0, 0, 0);
  
  const daysSinceAnchor = Math.floor((puzzleDate - ANCHOR_DATE) / (1000 * 60 * 60 * 24));
  const puzzleIndex = ((daysSinceAnchor % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  
  return PUZZLES[puzzleIndex];
}


function getTimeUntilNextPuzzle() {
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const nextPuzzle = new Date(estTime);
  nextPuzzle.setHours(7, 0, 0, 0);
  
  if (estTime.getHours() >= 7) {
    nextPuzzle.setDate(nextPuzzle.getDate() + 1);
  }
  
  const diff = nextPuzzle - estTime;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
}

// =============================================================================
// GAME CONSTANTS
// GAME CONSTANTS
// =============================================================================

const REWARDS = {
  4: { icon: '🎵', name: 'Music Notes' },
  5: { icon: '☕', name: 'Coffee Cups' },
  6: { icon: '🍯', name: 'Honey Pots' },
  7: { icon: '🧈', name: 'Butter Pats' },
  8: { icon: '🥞', name: 'Pancake Stacks' },
  9: { icon: '👑', name: 'Crown Jewels' },
  10: { icon: '🏆', name: 'Trophies' },
  11: { icon: '💎', name: 'Diamonds' }
};

const ACHIEVEMENTS = [
  { threshold: 100, title: 'Cafe Legend', icon: '👑', color: '#FFD700' },
  { threshold: 80, title: 'Cafe Aficionado', icon: '⭐', color: '#FFA500' },
  { threshold: 60, title: 'Cafe Connoisseur', icon: '🎩', color: '#CD853F' },
  { threshold: 40, title: 'Cafe Enthusiast', icon: '☕', color: '#8B4513' },
  { threshold: 20, title: 'Cafe Regular', icon: '🍵', color: '#A0522D' },
  { threshold: 0, title: 'Cafe Newbie', icon: '🌱', color: '#6B8E23' }
];

const ENCOURAGEMENTS = [
  "The griddle's heating up!",
  "Something smells delicious! 🥞",
  "You're on a roll! 🧈",
  "The cafe's coming alive! ✨",
  "Keep that momentum going! 🍯",
  "The morning rush awaits! 🌅",
  "You're a natural! 👨‍🍳",
  "The regulars would be proud!",
  "Flip it like you mean it! 🥞",
  "Pure breakfast magic! ✨"
];

const JUKEBOX_TRACKS = [
  { id: 1, name: 'Cafe Newbie', icon: '🌱', src: '/audio/Cafe Newbie.mp3' },
  { id: 2, name: 'Cafe Regular', icon: '🍵', src: '/audio/Cafe Regular.mp3' },
  { id: 3, name: 'Cafe Enthusiast', icon: '☕', src: '/audio/Cafe Enthusiast.mp3' },
  { id: 4, name: 'Cafe Connoisseur', icon: '🎩', src: '/audio/Cafe Connoisseur.mp3' },
  { id: 5, name: 'Cafe Aficionado', icon: '⭐', src: '/audio/Cafe Aficionado.mp3' },
  { id: 6, name: 'Cafe Legend', icon: '👑', src: '/audio/Cafe Legend.mp3' }
];

// =============================================================================
// THEME CONFIGURATION
// =============================================================================

const THEMES = {
  light: {
    bg: 'linear-gradient(180deg, #F5DEB3 0%, #DEB887 15%, #D2691E 40%, #CD853F 65%, #8B4513 100%)',
    cardBg: 'rgba(255, 253, 245, 0.97)',
    cardBgSolid: '#FFFDF5',
    cardBorder: '#8B4513',
    text: '#5D4E37',
    textSecondary: '#8B7355',
    textLight: '#FFF8DC',
    accent: '#D2691E',
    accentLight: 'rgba(210, 105, 30, 0.15)',
    headerBg: 'linear-gradient(180deg, rgba(61, 50, 41, 0.95) 0%, rgba(61, 50, 41, 0.85) 60%, transparent 100%)',
    griddleBg: '#5D4E37',
    griddleBorder: '#3D3229',
    buttonBg: '#8B7355',
    successBg: '#dcfce7',
    successText: '#166534',
    errorBg: '#fee2e2',
    errorText: '#991b1b',
    encouragementBg: '#fef3c7',
    encouragementText: '#92400e'
  },
  dark: {
    bg: 'linear-gradient(180deg, #1a1510 0%, #2d261f 15%, #3d322a 40%, #4a3f35 65%, #5d4e40 100%)',
    cardBg: 'rgba(45, 38, 31, 0.97)',
    cardBgSolid: '#2d261f',
    cardBorder: '#8B7355',
    text: '#F5DEB3',
    textSecondary: '#DEB887',
    textLight: '#FFF8DC',
    accent: '#DEB887',
    accentLight: 'rgba(222, 184, 135, 0.2)',
    headerBg: 'linear-gradient(180deg, rgba(26, 21, 16, 0.98) 0%, rgba(26, 21, 16, 0.9) 60%, transparent 100%)',
    griddleBg: '#3d322a',
    griddleBorder: '#1a1510',
    buttonBg: '#5d4e40',
    successBg: '#14532d',
    successText: '#86efac',
    errorBg: '#7f1d1d',
    errorText: '#fecaca',
    encouragementBg: '#78350f',
    encouragementText: '#fde68a'
  }
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function LetterGriddleCafeGame() {
  const [puzzleData] = useState(() => getTodaysPuzzle());
  const [timeUntilNext, setTimeUntilNext] = useState('');
  
  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState(new Set());
  const [availableLetters, setAvailableLetters] = useState(() => shuffleArray([...puzzleData.letters]));
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [highlightLength, setHighlightLength] = useState(null);
  const [wordsExpanded, setWordsExpanded] = useState(true);
  
  // Modal states
  const [showJukebox, setShowJukebox] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [levelUpNotification, setLevelUpNotification] = useState(null);
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? THEMES.dark : THEMES.light;
  
  // Jukebox states
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  
  // Stats states
  const [stats, setStats] = useState({
    totalPuzzlesPlayed: 0,
    totalWordsFound: 0,
    currentStreak: 0,
    longestStreak: 0,
    bestPercentage: 0,
    lastPlayedDate: null,
    achievementsEarned: []
  });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [previousAchievement, setPreviousAchievement] = useState(null);

  const totalWords = Object.values(puzzleData.words).flat().length;
  const foundCount = foundWords.size;
  const percentage = Math.round((foundCount / totalWords) * 100);
  const currentYear = new Date().getFullYear();

  const hasKeyLetters = (word) => {
    return puzzleData.keyLetters.every(letter => word.includes(letter));
  };

  const getCurrentAchievement = useCallback(() => {
    return ACHIEVEMENTS.find(a => percentage >= a.threshold) || ACHIEVEMENTS[ACHIEVEMENTS.length - 1];
  }, [percentage]);

  const getFoundByLength = (length) => {
    const wordsInCategory = puzzleData.words[length] || [];
    return wordsInCategory.filter(w => foundWords.has(w)).length;
  };

  const getTotalByLength = (length) => {
    return (puzzleData.words[length] || []).length;
  };

  const getWordLength = (word) => {
    if (word.length >= 9) return 9;
    if (word.length >= 8) return 8;
    return word.length;
  };

  // Update countdown timer
  useEffect(() => {
    const updateTimer = () => setTimeUntilNext(getTimeUntilNextPuzzle());
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load saved progress and stats
  useEffect(() => {
    try {
      // Load game progress
      const saved = localStorage.getItem(`letterGriddleCafeGame_${puzzleData.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.foundWords && Array.isArray(parsed.foundWords)) {
          setFoundWords(new Set(parsed.foundWords));
          const savedPercentage = Math.round((parsed.foundWords.length / totalWords) * 100);
          const savedAchievement = ACHIEVEMENTS.find(a => savedPercentage >= a.threshold);
          setPreviousAchievement(savedAchievement);
        }
        if (parsed.gameStarted) setGameStarted(true);
      }
      
      // Load stats
      const savedStats = localStorage.getItem('letterGriddleCafeStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      
      // Load dark mode preference
      const savedDarkMode = localStorage.getItem('letterGriddleCafeDarkMode');
      if (savedDarkMode) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
      
      // Load jukebox preferences
      const jukeboxSaved = localStorage.getItem('letterGriddleCafeJukebox');
      if (jukeboxSaved) {
        const jukeboxParsed = JSON.parse(jukeboxSaved);
        if (jukeboxParsed.volume) setVolume(jukeboxParsed.volume);
        if (jukeboxParsed.currentTrack) setCurrentTrack(jukeboxParsed.currentTrack);
      }
    } catch (e) {
      console.error('Could not load saved progress', e);
    }
    setIsLoaded(true);
  }, [puzzleData.id, totalWords]);

  // Save progress
  useEffect(() => {
    if (isLoaded && foundWords.size > 0) {
      try {
        localStorage.setItem(`letterGriddleCafeGame_${puzzleData.id}`, JSON.stringify({
          foundWords: Array.from(foundWords),
          gameStarted: gameStarted,
          lastPlayed: new Date().toISOString()
        }));
      } catch (e) {
        console.error('Could not save progress', e);
      }
    }
  }, [foundWords, gameStarted, isLoaded, puzzleData.id]);

  // Save stats
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('letterGriddleCafeStats', JSON.stringify(stats));
      } catch (e) {
        console.error('Could not save stats', e);
      }
    }
  }, [stats, isLoaded]);

  // Save dark mode preference
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('letterGriddleCafeDarkMode', JSON.stringify(darkMode));
      } catch (e) {
        console.error('Could not save dark mode preference', e);
      }
    }
  }, [darkMode, isLoaded]);

  // Save jukebox preferences
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('letterGriddleCafeJukebox', JSON.stringify({ volume, currentTrack }));
      } catch (e) {
        console.error('Could not save jukebox preferences', e);
      }
    }
  }, [volume, currentTrack, isLoaded]);

  // Load audio source when currentTrack changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const track = JUKEBOX_TRACKS.find(t => t.name === currentTrack);
      if (track && audioRef.current.src !== window.location.origin + track.src) {
        audioRef.current.src = track.src;
        audioRef.current.load();
      }
    }
  }, [currentTrack]);

  // Audio handling - volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Audio handling - play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Level up detection
  useEffect(() => {
    if (isLoaded && previousAchievement) {
      const currentAch = getCurrentAchievement();
      if (currentAch.threshold > previousAchievement.threshold) {
        setLevelUpNotification(currentAch);
        setPreviousAchievement(currentAch);
        setTimeout(() => setLevelUpNotification(null), 4000);
      }
    } else if (isLoaded && !previousAchievement && foundWords.size > 0) {
      setPreviousAchievement(getCurrentAchievement());
    }
  }, [percentage, isLoaded, previousAchievement, getCurrentAchievement, foundWords.size]);

  // Update stats when puzzle is completed or significant progress is made
  const updateStats = useCallback((newFoundCount, newPercentage) => {
    const today = new Date().toDateString();
    
    setStats(prev => {
      const isNewDay = prev.lastPlayedDate !== today;
      const wasYesterday = prev.lastPlayedDate === new Date(Date.now() - 86400000).toDateString();
      
      return {
        totalPuzzlesPlayed: isNewDay ? prev.totalPuzzlesPlayed + 1 : prev.totalPuzzlesPlayed,
        totalWordsFound: prev.totalWordsFound + 1,
        currentStreak: isNewDay ? (wasYesterday ? prev.currentStreak + 1 : 1) : prev.currentStreak,
        longestStreak: Math.max(prev.longestStreak, isNewDay ? (wasYesterday ? prev.currentStreak + 1 : 1) : prev.currentStreak),
        bestPercentage: Math.max(prev.bestPercentage, newPercentage),
        lastPlayedDate: today,
        achievementsEarned: prev.achievementsEarned
      };
    });
  }, []);

  const shuffleLetters = () => {
    setAvailableLetters(prev => shuffleArray(prev));
  };

  const addLetter = useCallback((letter) => {
    const upperLetter = letter.toUpperCase();
    if (puzzleData.letters.includes(upperLetter)) {
      setCurrentWord(prev => prev + upperLetter);
      setMessage('');
    }
  }, [puzzleData.letters]);

  const removeLetter = useCallback(() => {
    setCurrentWord(prev => prev.slice(0, -1));
    setMessage('');
  }, []);

  const clearWord = useCallback(() => {
    setCurrentWord('');
    setMessage('');
  }, []);

  const submitWord = useCallback(() => {
    if (currentWord.length < 4) {
      setMessage('Words must be at least 4 letters');
      setMessageType('error');
      setCurrentWord('');
      return;
    }

    if (!hasKeyLetters(currentWord)) {
      setMessage(`Must contain both ${puzzleData.keyLetters.join(' and ')}!`);
      setMessageType('error');
      setCurrentWord('');
      return;
    }

    if (foundWords.has(currentWord)) {
      setMessage('Already found!');
      setMessageType('error');
      setCurrentWord('');
      return;
    }

    const allWords = Object.values(puzzleData.words).flat();
    if (allWords.includes(currentWord)) {
      const newFoundWords = new Set(foundWords);
      newFoundWords.add(currentWord);
      setFoundWords(newFoundWords);
      
      const newPercentage = Math.round((newFoundWords.size / totalWords) * 100);
      updateStats(newFoundWords.size, newPercentage);
      
      const wordLength = getWordLength(currentWord);
      const reward = REWARDS[wordLength];
      setMessage(`${reward.icon} +1 ${reward.name}!`);
      setMessageType('success');
      
      if (currentWord.length >= 9) {
        setTimeout(() => {
          setMessage('👑 INCREDIBLE! You found a 9-letter word!');
          setMessageType('encouragement');
        }, 1500);
      } else if (currentWord.length >= 8) {
        setTimeout(() => {
          setMessage('🥞 Amazing! 8-letter word found!');
          setMessageType('encouragement');
        }, 1500);
      } else if ((newFoundWords.size) % 5 === 0 && newFoundWords.size < totalWords) {
        setTimeout(() => {
          const encouragement = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
          setMessage(encouragement);
          setMessageType('encouragement');
        }, 1500);
      }
      
      if (newFoundWords.size === totalWords) {
        setTimeout(() => {
          setShowConfetti(true);
          setShowComplete(true);
        }, 1000);
      }
    } else {
      setMessage('Not in word list');
      setMessageType('error');
    }
    
    setCurrentWord('');
  }, [currentWord, foundWords, totalWords, puzzleData, updateStats]);

  // Keyboard support
  useEffect(() => {
    if (!gameStarted) return;

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      
      if (e.key === 'Enter') {
        e.preventDefault();
        submitWord();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        removeLetter();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        clearWord();
      } else if (puzzleData.letters.includes(key)) {
        e.preventDefault();
        addLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, addLetter, removeLetter, clearWord, submitWord, puzzleData.letters]);

  const togglePlayPause = () => {
    if (!currentTrack) {
      const firstTrack = JUKEBOX_TRACKS[0];
      setCurrentTrack(firstTrack.name);
      if (audioRef.current) {
        audioRef.current.src = firstTrack.src;
        audioRef.current.load();
        audioRef.current.oncanplaythrough = () => {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        };
      }
      setIsPlaying(true);
    } else if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const selectTrack = (trackName) => {
    const track = JUKEBOX_TRACKS.find(t => t.name === trackName);
    if (!track) return;
    
    if (currentTrack === trackName) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackName);
      setIsPlaying(true);
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = track.src;
        audioRef.current.load();
        audioRef.current.oncanplaythrough = () => {
          if (audioRef.current) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
          }
        };
      }
    }
  };

  // Share results function
  const shareResults = () => {
    const achievement = getCurrentAchievement();
    const shareText = `☕ Letter Griddle Cafe\n\n${achievement.icon} ${achievement.title}\n${foundCount}/${totalWords} words (${percentage}%)\n\n🎵${getFoundByLength(4)} ☕${getFoundByLength(5)} 🍯${getFoundByLength(6)} 🧈${getFoundByLength(7)} 🥞${getFoundByLength(8)} 👑${getFoundByLength(9)} 🏆${getFoundByLength(10)} 💎${getFoundByLength(11)}\n\n🔥 Streak: ${stats.currentStreak} days\n\nPlay at lettergriddlecafe.com/game`;
    
    if (navigator.share) {
      navigator.share({ text: shareText }).catch(() => {
        navigator.clipboard.writeText(shareText);
        setMessage('Copied to clipboard!');
        setMessageType('success');
      });
    } else {
      navigator.clipboard.writeText(shareText);
      setMessage('Copied to clipboard!');
      setMessageType('success');
    }
  };

  const currentHasFirstKey = currentWord.includes(puzzleData.keyLetters[0]);
  const currentHasSecondKey = currentWord.includes(puzzleData.keyLetters[1]);

  // =========================================================================
  // WELCOME SCREEN
  // =========================================================================
  if (!gameStarted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: theme.bg,
        fontFamily: "'Playfair Display', Georgia, serif"
      }}>
        <audio ref={audioRef} loop />
        
        <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'}}>
          <div style={{
            backgroundColor: theme.cardBg,
            border: `3px solid ${theme.cardBorder}`,
            boxShadow: '0 20px 60px rgba(139, 69, 19, 0.4)',
            borderRadius: '24px',
            padding: '32px',
            maxWidth: '420px',
            width: '100%'
          }}>
            {/* Dark Mode Toggle & Back Link */}
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
              <a href="/" style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: theme.textSecondary, textDecoration: 'none'}}>
                ← Back to Cafe
              </a>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '9999px',
                  backgroundColor: theme.accentLight,
                  border: `2px solid ${theme.cardBorder}`,
                  color: theme.text,
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>

            <div style={{textAlign: 'center', marginBottom: '16px'}}>
              <div style={{fontSize: '48px'}}>☕</div>
            </div>

            <h1 style={{fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: theme.text}}>
              Letter Griddle Cafe
            </h1>
            <p style={{textAlign: 'center', marginBottom: '24px', fontSize: '14px', padding: '8px 16px', borderRadius: '8px', color: theme.text, backgroundColor: theme.accentLight}}>
              {puzzleData.subtitle}
            </p>

            <button
              onClick={() => setGameStarted(true)}
              style={{
                background: 'linear-gradient(135deg, #DEB887 0%, #D2691E 50%, #8B4513 100%)',
                color: '#FFF8DC',
                border: '2px solid #5D4E37',
                borderRadius: '9999px',
                padding: '16px 24px',
                fontWeight: 'bold',
                fontSize: '18px',
                cursor: 'pointer',
                width: '100%',
                transition: 'transform 0.2s',
                marginBottom: '24px'
              }}
            >
              {foundWords.size > 0 ? 'Continue Playing' : "Cafe's Doors Are Open"}
            </button>

            {/* How to Play */}
            <div style={{padding: '20px', borderRadius: '16px', backgroundColor: theme.accentLight, border: `2px solid ${theme.cardBorder}`, marginBottom: '16px'}}>
              <h2 style={{fontWeight: 'bold', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: theme.text}}>
                ☕ How to Play
              </h2>
              <ul style={{listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', color: theme.text}}>
                <li style={{marginBottom: '8px'}}>☕ Build words using the 7 letters (reuse allowed!)</li>
                <li style={{marginBottom: '8px'}}>⭐ <strong>Every word must contain BOTH {puzzleData.keyLetters.join(' and ')}</strong></li>
                <li style={{marginBottom: '8px'}}>☕ Words must be at least 4 letters</li>
                <li style={{marginBottom: '8px'}}>☕ Click letters or type on keyboard</li>
                <li style={{marginBottom: '8px'}}>☕ Press Enter to submit, Backspace to delete</li>
                <li>☕ Collect rewards: 🎵 ☕ 🍯 🧈 🥞 👑 🏆 💎</li>
              </ul>
            </div>

            {/* Key Letters */}
            <div style={{padding: '16px', borderRadius: '16px', textAlign: 'center', background: 'linear-gradient(135deg, #5D4E37, #3D3229)', border: '2px solid #8B7355', marginBottom: '16px'}}>
              <p style={{fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: '#DEB887'}}>
                Key Letters Required
              </p>
              <div style={{display: 'flex', justifyContent: 'center', gap: '16px'}}>
                {puzzleData.keyLetters.map(letter => (
                  <span key={letter} style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    background: 'linear-gradient(145deg, #FFD700, #FFA500)',
                    border: '3px solid #DAA520',
                    color: '#5D4E37'
                  }}>
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Preview */}
            {stats.totalPuzzlesPlayed > 0 && (
              <div style={{padding: '16px', borderRadius: '16px', backgroundColor: theme.accentLight, border: `2px solid ${theme.cardBorder}`, marginBottom: '16px'}}>
                <h3 style={{fontWeight: 'bold', marginBottom: '8px', color: theme.text, textAlign: 'center'}}>📊 Your Stats</h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '14px'}}>
                  <div style={{textAlign: 'center', padding: '8px', backgroundColor: theme.cardBgSolid, borderRadius: '8px'}}>
                    <div style={{fontSize: '20px', fontWeight: 'bold', color: theme.accent}}>{stats.currentStreak}</div>
                    <div style={{fontSize: '12px', color: theme.textSecondary}}>🔥 Streak</div>
                  </div>
                  <div style={{textAlign: 'center', padding: '8px', backgroundColor: theme.cardBgSolid, borderRadius: '8px'}}>
                    <div style={{fontSize: '20px', fontWeight: 'bold', color: theme.accent}}>{stats.bestPercentage}%</div>
                    <div style={{fontSize: '12px', color: theme.textSecondary}}>🏆 Best</div>
                  </div>
                </div>
              </div>
            )}

            {/* Timer */}
            <div style={{marginTop: '16px', textAlign: 'center', padding: '12px', borderRadius: '9999px', backgroundColor: theme.accentLight, color: theme.text}}>
              <span style={{fontSize: '14px', fontWeight: '500'}}>
                Next puzzle in: {timeUntilNext}
              </span>
            </div>
            
            {foundWords.size > 0 && (
              <div style={{marginTop: '12px', textAlign: 'center', fontSize: '12px', color: theme.textSecondary}}>
                ✨ Your progress is saved ({foundWords.size} words found)
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer style={{textAlign: 'center', padding: '16px', fontSize: '12px', color: theme.textLight}}>
          <p>Part of <a href="/" style={{color: theme.textLight, textDecoration: 'underline'}}>The Letter Griddle Cafe</a></p>
          <p style={{marginTop: '4px'}}>
            <a href="https://www.lettergriddle.com/privacy" style={{color: theme.textLight, textDecoration: 'underline'}}>Privacy</a>
            {' • '}
            <a href="https://www.lettergriddle.com/terms" style={{color: theme.textLight, textDecoration: 'underline'}}>Terms</a>
          </p>
          <p style={{marginTop: '4px'}}>© {currentYear} Letter Griddle Cafe</p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // MAIN GAME SCREEN
  // =========================================================================
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: theme.bg,
      fontFamily: "'Playfair Display', Georgia, serif"
    }}>
      <audio ref={audioRef} loop />
      
      {/* Level Up Notification */}
      {levelUpNotification && (
        <div style={{position: 'fixed', top: '80px', left: '50%', transform: 'translateX(-50%)', zIndex: 50, animation: 'bounce 0.5s ease infinite'}}>
          <div style={{padding: '16px 24px', borderRadius: '16px', textAlign: 'center', backgroundColor: theme.cardBgSolid, border: '3px solid #FFD700', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'}}>
            <div style={{fontSize: '32px', marginBottom: '4px'}}>{levelUpNotification.icon}</div>
            <div style={{fontWeight: 'bold', fontSize: '18px', color: theme.text}}>Level Up!</div>
            <div style={{fontWeight: '600', color: levelUpNotification.color}}>{levelUpNotification.title}</div>
          </div>
        </div>
      )}

      {/* Confetti */}
      {showConfetti && (
        <div style={{position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50}}>
          {Array.from({ length: 60 }).map((_, i) => {
            const emojis = ['🥞', '☕', '🍯', '🧈', '👑', '⭐', '🎵', '🏆', '💎'];
            return (
              <div key={i} style={{
                position: 'absolute',
                fontSize: '24px',
                left: `${Math.random() * 100}%`,
                top: '-50px',
                animation: `confettiFall ${3 + Math.random() * 2}s ease-in ${Math.random() * 2}s forwards`
              }}>
                {emojis[i % emojis.length]}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          to { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>

      {/* Header */}
      <header style={{padding: '16px', background: theme.headerBg}}>
        <div style={{maxWidth: '640px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          {/* Left buttons */}
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <button
              onClick={() => setGameStarted(false)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(222, 184, 135, 0.3)',
                border: '2px solid rgba(222, 184, 135, 0.5)',
                color: theme.textLight,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
              title="How to Play"
            >
              ?
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(222, 184, 135, 0.3)',
                border: '2px solid rgba(222, 184, 135, 0.5)',
                color: theme.textLight,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          {/* Center title */}
          <div style={{textAlign: 'center', flex: 1, padding: '0 8px'}}>
            <h1 style={{fontSize: '20px', fontWeight: 'bold', color: theme.textLight}}>Letter Griddle Cafe</h1>
            <p style={{
              fontSize: '13px', 
              fontWeight: '600',
              padding: '6px 16px', 
              borderRadius: '9999px', 
              display: 'inline-block', 
              marginTop: '4px', 
              color: darkMode ? '#F5DEB3' : '#FFF8DC', 
              backgroundColor: darkMode ? 'rgba(205, 133, 63, 0.5)' : 'rgba(139, 69, 19, 0.7)',
              border: darkMode ? '1px solid rgba(205, 133, 63, 0.6)' : '2px solid rgba(139, 69, 19, 0.4)',
              textShadow: darkMode ? 'none' : '0 1px 2px rgba(0,0,0,0.2)'
            }}>
              Every word needs <span style={{fontWeight: '700', color: darkMode ? '#FFD700' : '#FFD700'}}>{puzzleData.keyLetters.join(' + ')}</span>
            </p>
          </div>
          
          {/* Right buttons */}
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <button
              onClick={() => setShowHints(true)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(222, 184, 135, 0.3)',
                border: '2px solid rgba(222, 184, 135, 0.5)',
                color: theme.textLight,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
              title="Hints"
            >
              💡
            </button>
            <button
              onClick={() => setShowStats(true)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(222, 184, 135, 0.3)',
                border: '2px solid rgba(222, 184, 135, 0.5)',
                color: theme.textLight,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px'
              }}
              title="Stats & Share"
            >
              📊
            </button>
            <button
              onClick={() => setShowJukebox(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                fontWeight: '600',
                background: isPlaying 
                  ? 'linear-gradient(135deg, #D2691E, #8B4513)' 
                  : 'linear-gradient(135deg, #5D4E37, #3D3229)',
                color: '#F5DEB3',
                border: '2px solid #CD853F',
                cursor: 'pointer',
                boxShadow: isPlaying ? '0 0 20px rgba(210, 105, 30, 0.7), 0 0 40px rgba(210, 105, 30, 0.4)' : 'none',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              🎵 Jukebox
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main style={{flex: 1, maxWidth: '640px', margin: '0 auto', padding: '0 16px 24px', width: '100%'}}>
        
        {/* Progress Card */}
        <div style={{
          backgroundColor: theme.cardBg,
          border: `2px solid ${theme.cardBorder}`,
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '12px'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
            <button onClick={() => setShowAchievements(true)} style={{display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer'}}>
              <span style={{fontSize: '20px'}}>{getCurrentAchievement().icon}</span>
              <span style={{fontWeight: '600', fontSize: '14px', color: theme.text}}>{getCurrentAchievement().title}</span>
            </button>
            <div style={{textAlign: 'right'}}>
              <span style={{fontSize: '20px', fontWeight: 'bold', color: theme.accent}}>{foundCount}</span>
              <span style={{fontSize: '14px', color: theme.textSecondary}}> / {totalWords}</span>
              <span style={{fontSize: '12px', marginLeft: '8px', padding: '2px 8px', borderRadius: '9999px', backgroundColor: theme.accentLight, color: theme.text}}>
                {percentage}%
              </span>
            </div>
          </div>
          
          <div style={{height: '12px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: darkMode ? '#3d322a' : '#F5DEB3'}}>
            <div style={{height: '100%', borderRadius: '9999px', transition: 'width 0.5s', width: `${percentage}%`, background: 'linear-gradient(90deg, #DEB887, #D2691E, #8B4513)'}} />
          </div>
        </div>

        {/* Reward Grid */}
        <div style={{
          backgroundColor: theme.cardBg,
          border: `2px solid ${theme.cardBorder}`,
          borderRadius: '16px',
          padding: '12px',
          marginBottom: '12px'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px', textAlign: 'center'}}>
            {[4, 5, 6, 7, 8, 9, 10, 11].map(length => {
              const isComplete = getFoundByLength(length) === getTotalByLength(length) && getTotalByLength(length) > 0;
              const hasWords = getTotalByLength(length) > 0;
              if (!hasWords) return null;
              return (
              <button
                key={length}
                onClick={() => setHighlightLength(prev => prev === length ? null : length)}
                style={{
                  padding: '8px 4px',
                  borderRadius: '12px',
                  border: highlightLength === length 
                    ? `2px solid ${darkMode ? '#FFD700' : theme.cardBorder}` 
                    : '2px solid transparent',
                  cursor: 'pointer',
                  backgroundColor: isComplete
                    ? (darkMode ? 'rgba(139, 69, 19, 0.5)' : 'rgba(139, 69, 19, 0.25)')
                    : highlightLength === length
                    ? (darkMode ? 'rgba(210, 105, 30, 0.5)' : 'rgba(210, 105, 30, 0.3)')
                    : (darkMode ? 'rgba(93, 78, 55, 0.6)' : theme.accentLight),
                  boxShadow: darkMode ? 'inset 0 1px 0 rgba(255,255,255,0.1)' : 'none'
                }}
              >
                <div style={{
                  fontSize: '24px', 
                  marginBottom: '2px',
                  filter: darkMode ? 'brightness(1.2)' : 'none',
                  textShadow: darkMode ? '0 0 8px rgba(255, 215, 0, 0.4)' : 'none'
                }}>{REWARDS[length].icon}</div>
                <div style={{
                  fontSize: '13px', 
                  fontWeight: '600', 
                  color: darkMode ? '#F5DEB3' : theme.text
                }}>{length === 9 ? '9+' : length}</div>
                <div style={{
                  fontSize: '13px', 
                  fontWeight: 'bold', 
                  color: darkMode ? '#FFD700' : theme.accent
                }}>{getFoundByLength(length)}/{getTotalByLength(length)}</div>
              </button>
            )})}
          </div>
        </div>

        {/* Found Words */}
        {foundWords.size > 0 && (
          <div style={{
            backgroundColor: theme.cardBg,
            border: `2px solid ${theme.cardBorder}`,
            borderRadius: '16px',
            marginBottom: '12px',
            overflow: 'hidden'
          }}>
            <button 
              onClick={() => setWordsExpanded(!wordsExpanded)}
              style={{width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: theme.accentLight, border: 'none', cursor: 'pointer'}}
            >
              <span style={{fontWeight: '600', fontSize: '14px', color: theme.text}}>Words Found ({foundWords.size})</span>
              <span style={{color: theme.text}}>{wordsExpanded ? '▲' : '▼'}</span>
            </button>
            
            {wordsExpanded && (
              <div style={{padding: '12px'}}>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                  {Array.from(foundWords).sort().map(word => {
                    const wordLen = getWordLength(word);
                    const isHighlighted = highlightLength === null || highlightLength === wordLen;
                    return (
                      <span key={word} style={{
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px',
                        fontWeight: '600',
                        opacity: isHighlighted ? 1 : 0.3,
                        backgroundColor: isHighlighted ? (darkMode ? '#5d4e40' : '#F5DEB3') : theme.cardBgSolid,
                        color: theme.text,
                        border: highlightLength === wordLen ? `2px solid ${theme.cardBorder}` : `1px solid ${theme.textSecondary}`
                      }}>
                        {word}
                      </span>
                    );
                  })}
                </div>
                {highlightLength && (
                  <p style={{fontSize: '12px', textAlign: 'center', marginTop: '8px', color: theme.text}}>
                    Showing {highlightLength}-letter words • <button onClick={() => setHighlightLength(null)} style={{textDecoration: 'underline', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer', color: theme.text}}>Show all</button>
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Current Word Display */}
        <div style={{
          backgroundColor: theme.cardBg,
          border: `2px solid ${theme.cardBorder}`,
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '12px'
        }}>
          <div style={{display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '12px'}}>
            <div style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '16px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              transform: currentHasFirstKey ? 'scale(1.1)' : 'scale(1)',
              opacity: currentHasFirstKey ? 1 : (darkMode ? 0.7 : 0.8),
              backgroundColor: currentHasFirstKey 
                ? (darkMode ? '#14532d' : '#90EE90') 
                : (darkMode ? 'rgba(93, 78, 55, 0.8)' : '#F5DEB3'),
              color: currentHasFirstKey 
                ? (darkMode ? '#86efac' : '#228B22') 
                : (darkMode ? '#F5DEB3' : theme.textSecondary),
              border: currentHasFirstKey ? 'none' : '2px solid #DAA520',
              boxShadow: currentHasFirstKey ? '0 0 10px rgba(144, 238, 144, 0.5)' : 'none'
            }}>
              <span>{puzzleData.keyLetters[0]}</span>
              {currentHasFirstKey && <span>✓</span>}
            </div>
            <div style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '16px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              transform: currentHasSecondKey ? 'scale(1.1)' : 'scale(1)',
              opacity: currentHasSecondKey ? 1 : (darkMode ? 0.7 : 0.8),
              backgroundColor: currentHasSecondKey 
                ? (darkMode ? '#14532d' : '#90EE90') 
                : (darkMode ? 'rgba(93, 78, 55, 0.8)' : '#F5DEB3'),
              color: currentHasSecondKey 
                ? (darkMode ? '#86efac' : '#228B22') 
                : (darkMode ? '#F5DEB3' : theme.textSecondary),
              border: currentHasSecondKey ? 'none' : '2px solid #DAA520',
              boxShadow: currentHasSecondKey ? '0 0 10px rgba(144, 238, 144, 0.5)' : 'none'
            }}>
              <span>{puzzleData.keyLetters[1]}</span>
              {currentHasSecondKey && <span>✓</span>}
            </div>
          </div>

          <div style={{
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            marginBottom: '12px',
            padding: '12px',
            backgroundColor: theme.cardBgSolid,
            border: `2px dashed ${theme.textSecondary}`
          }}>
            <span style={{fontSize: '28px', fontWeight: 'bold', letterSpacing: '4px', color: currentWord ? theme.text : theme.textSecondary}}>
              {currentWord || 'type or click...'}
            </span>
          </div>
          
          <div style={{height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {message && (
              <div style={{
                textAlign: 'center',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '14px',
                backgroundColor: messageType === 'success' ? theme.successBg : messageType === 'encouragement' ? theme.encouragementBg : theme.errorBg,
                color: messageType === 'success' ? theme.successText : messageType === 'encouragement' ? theme.encouragementText : theme.errorText
              }}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Letter Griddle */}
        <div style={{
          backgroundColor: theme.griddleBg,
          border: `3px solid ${theme.griddleBorder}`,
          borderRadius: '16px',
          padding: '20px'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px'}}>
            <span style={{fontSize: '20px'}}>🍳</span>
            <h3 style={{fontSize: '18px', fontWeight: 'bold', color: '#F5DEB3'}}>Letter Griddle</h3>
            <span style={{fontSize: '20px'}}>🍳</span>
          </div>
          
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', marginBottom: '20px'}}>
            {availableLetters.map((letter, idx) => {
              const isKeyLetter = puzzleData.keyLetters.includes(letter);
              return (
                <button
                  key={idx}
                  onClick={() => addLetter(letter)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isKeyLetter 
                      ? 'linear-gradient(145deg, #FFD700, #FFA500)'
                      : 'linear-gradient(145deg, #FFF8DC, #F5DEB3)',
                    border: isKeyLetter 
                      ? '4px solid #DAA520'
                      : '4px solid #D2691E',
                    color: '#5D4E37'
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
          
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', paddingTop: '16px', borderTop: '2px solid #8B7355'}}>
            <button onClick={clearWord} style={{backgroundColor: theme.buttonBg, color: '#F5DEB3', borderRadius: '9999px', padding: '8px 16px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', border: 'none'}}>Clear</button>
            <button onClick={removeLetter} style={{backgroundColor: theme.buttonBg, color: '#F5DEB3', borderRadius: '9999px', padding: '8px 16px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', border: 'none'}}>← Delete</button>
            <button onClick={shuffleLetters} style={{backgroundColor: theme.buttonBg, color: '#F5DEB3', borderRadius: '9999px', padding: '8px 16px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', border: 'none'}}>Shuffle</button>
            <button onClick={submitWord} style={{background: 'linear-gradient(135deg, #DEB887, #D2691E)', color: '#FFF8DC', border: '2px solid #CD853F', borderRadius: '9999px', padding: '8px 24px', fontWeight: '600', fontSize: '14px', cursor: 'pointer'}}>Enter</button>
          </div>
        </div>

        <div style={{marginTop: '16px', textAlign: 'center', padding: '8px', borderRadius: '9999px', backgroundColor: 'rgba(255, 253, 245, 0.3)', color: theme.textLight}}>
          <span style={{fontSize: '14px'}}>☕ Open 24 hours • Progress saves automatically</span>
        </div>
      </main>

      {/* Stats Modal */}
      {showStats && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px'}} onClick={() => setShowStats(false)}>
          <div style={{backgroundColor: theme.cardBgSolid, border: `3px solid ${theme.cardBorder}`, borderRadius: '24px', padding: '24px', maxWidth: '380px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowStats(false)} style={{position: 'absolute', top: '16px', right: '16px', padding: '4px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary, fontSize: '20px'}}>✕</button>
            
            <div style={{textAlign: 'center', marginBottom: '16px'}}>
              <div style={{fontSize: '40px', marginBottom: '8px'}}>📊</div>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', color: theme.text}}>Your Stats</h2>
            </div>
            
            {/* Current Game Stats */}
            <div style={{padding: '16px', borderRadius: '16px', backgroundColor: theme.accentLight, marginBottom: '16px'}}>
              <h3 style={{fontWeight: 'bold', marginBottom: '12px', color: theme.text, textAlign: 'center'}}>Today's Progress</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center'}}>
                <div style={{padding: '12px', backgroundColor: theme.cardBgSolid, borderRadius: '12px'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: theme.accent}}>{foundCount}</div>
                  <div style={{fontSize: '12px', color: theme.textSecondary}}>Words</div>
                </div>
                <div style={{padding: '12px', backgroundColor: theme.cardBgSolid, borderRadius: '12px'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: theme.accent}}>{percentage}%</div>
                  <div style={{fontSize: '12px', color: theme.textSecondary}}>Complete</div>
                </div>
                <div style={{padding: '12px', backgroundColor: theme.cardBgSolid, borderRadius: '12px'}}>
                  <div style={{fontSize: '24px'}}>{getCurrentAchievement().icon}</div>
                  <div style={{fontSize: '12px', color: theme.textSecondary}}>Level</div>
                </div>
              </div>
            </div>

            {/* Overall Stats */}
            <div style={{padding: '16px', borderRadius: '16px', backgroundColor: theme.accentLight, marginBottom: '16px'}}>
              <h3 style={{fontWeight: 'bold', marginBottom: '12px', color: theme.text, textAlign: 'center'}}>All Time</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', textAlign: 'center'}}>
                <div style={{padding: '12px', backgroundColor: theme.cardBgSolid, borderRadius: '12px'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: theme.accent}}>{stats.currentStreak}</div>
                  <div style={{fontSize: '12px', color: theme.textSecondary}}>🔥 Current Streak</div>
                </div>
                <div style={{padding: '12px', backgroundColor: theme.cardBgSolid, borderRadius: '12px'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: theme.accent}}>{stats.longestStreak}</div>
                  <div style={{fontSize: '12px', color: theme.textSecondary}}>⭐ Best Streak</div>
                </div>
                <div style={{padding: '12px', backgroundColor: theme.cardBgSolid, borderRadius: '12px'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: theme.accent}}>{stats.totalWordsFound}</div>
                  <div style={{fontSize: '12px', color: theme.textSecondary}}>📝 Total Words</div>
                </div>
                <div style={{padding: '12px', backgroundColor: theme.cardBgSolid, borderRadius: '12px'}}>
                  <div style={{fontSize: '24px', fontWeight: 'bold', color: theme.accent}}>{stats.bestPercentage}%</div>
                  <div style={{fontSize: '12px', color: theme.textSecondary}}>🏆 Best Score</div>
                </div>
              </div>
            </div>

            {/* Share Button */}
            <button
              onClick={shareResults}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #DEB887 0%, #D2691E 50%, #8B4513 100%)',
                color: '#FFF8DC',
                border: '2px solid #5D4E37',
                marginBottom: '12px'
              }}
            >
             Share Results
            </button>

            {/* Answer Key Button */}
            <button
              onClick={() => { setShowStats(false); setShowAnswerKey(true); }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: theme.accentLight,
                color: theme.text,
                border: `2px solid ${theme.cardBorder}`
              }}
            >
              📋 View Yesterday's Answers
            </button>
          </div>
        </div>
      )}

      {/* Answer Key Modal */}
      {showAnswerKey && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px'}} onClick={() => setShowAnswerKey(false)}>
          <div style={{backgroundColor: theme.cardBgSolid, border: `3px solid ${theme.cardBorder}`, borderRadius: '24px', padding: '24px', maxWidth: '420px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowAnswerKey(false)} style={{position: 'absolute', top: '16px', right: '16px', padding: '4px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary, fontSize: '20px'}}>✕</button>
            
            <div style={{textAlign: 'center', marginBottom: '16px'}}>
              <div style={{fontSize: '40px', marginBottom: '8px'}}>📋</div>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', color: theme.text}}>Yesterday's Answers</h2>
              <p style={{fontSize: '14px', color: theme.textSecondary, marginTop: '4px'}}>{getYesterdaysPuzzle().subtitle}</p>
            </div>
            
            {[4, 5, 6, 7, 8, 9, 10, 11].map(length => {
              const words = getYesterdaysPuzzle().words[length] || [];
              if (words.length === 0) return null;
              return (
                <div key={length} style={{marginBottom: '16px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                    <span style={{fontSize: '20px'}}>{REWARDS[length].icon}</span>
                    <span style={{fontWeight: 'bold', color: theme.text}}>{length === 9 ? '9+' : length} Letters ({words.length})</span>
                  </div>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '6px'}}>
                    {words.map(word => (
                      <span key={word} style={{
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '13px',
                        fontWeight: '500',
                        backgroundColor: theme.accentLight,
                        color: theme.text,
                        border: `1px solid ${theme.textSecondary}`
                      }}>
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hints Modal */}
      {showHints && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px'}} onClick={() => setShowHints(false)}>
          <div style={{backgroundColor: theme.cardBgSolid, border: `3px solid ${theme.cardBorder}`, borderRadius: '24px', padding: '24px', maxWidth: '420px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowHints(false)} style={{position: 'absolute', top: '16px', right: '16px', padding: '4px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary, fontSize: '20px'}}>✕</button>
            
            <div style={{textAlign: 'center', marginBottom: '16px'}}>
              <div style={{fontSize: '40px', marginBottom: '8px'}}>💡</div>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', color: theme.text}}>Hints Grid</h2>
              <p style={{fontSize: '14px', color: theme.textSecondary, marginTop: '4px'}}>Tap a category to see hints</p>
            </div>
            
            {[4, 5, 6, 7, 8, 9, 10, 11].map(length => {
              const words = puzzleData.words[length] || [];
              const hints = puzzleData.hints?.[length] || [];
              const foundInCategory = words.filter(w => foundWords.has(w));
              if (words.length === 0) return null;
              return (
                <details key={length} style={{marginBottom: '12px'}}>
                  <summary style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: theme.accentLight,
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{fontSize: '20px'}}>{REWARDS[length].icon}</span>
                      <span style={{fontWeight: 'bold', color: theme.text}}>{length === 9 ? '9+' : length} Letters</span>
                    </div>
                    <span style={{fontSize: '14px', color: theme.textSecondary}}>
                      {foundInCategory.length}/{words.length} found
                    </span>
                  </summary>
                  <div style={{padding: '12px', marginTop: '8px', backgroundColor: theme.cardBg, borderRadius: '12px', border: `1px solid ${theme.textSecondary}`}}>
                    {words.map((word, idx) => {
                      const isFound = foundWords.has(word);
                      const hint = hints[idx] || '???';
                      return (
                        <div key={word} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          marginBottom: '4px',
                          backgroundColor: isFound ? (darkMode ? 'rgba(20, 83, 45, 0.5)' : 'rgba(144, 238, 144, 0.3)') : 'transparent'
                        }}>
                          <span style={{fontSize: '14px', color: theme.text, flex: 1}}>
                            {isFound ? word : hint}
                          </span>
                          <span style={{fontSize: '14px', color: isFound ? theme.successText : theme.textSecondary}}>
                            {isFound ? '✓' : '?'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      )}

      {/* Achievements Modal */}
      {showAchievements && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px'}} onClick={() => setShowAchievements(false)}>
          <div style={{backgroundColor: theme.cardBgSolid, border: `3px solid ${theme.cardBorder}`, borderRadius: '24px', padding: '24px', maxWidth: '380px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowAchievements(false)} style={{position: 'absolute', top: '16px', right: '16px', padding: '4px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary, fontSize: '20px'}}>✕</button>
            
            <div style={{textAlign: 'center', marginBottom: '16px'}}>
              <div style={{fontSize: '40px', marginBottom: '8px'}}>🏆</div>
              <h2 style={{fontSize: '24px', fontWeight: 'bold', color: theme.text}}>Achievement Levels</h2>
              <p style={{fontSize: '14px', marginTop: '4px', color: theme.textSecondary}}>You're at {percentage}% - {getCurrentAchievement().title}</p>
            </div>
            
            <div>
              {ACHIEVEMENTS.map(ach => {
                const isAchieved = percentage >= ach.threshold;
                const isCurrent = getCurrentAchievement().title === ach.title;
                return (
                  <div key={ach.title} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '12px', marginBottom: '8px', border: isCurrent ? '2px solid #D2691E' : '2px solid transparent', backgroundColor: isAchieved ? theme.accentLight : (darkMode ? 'rgba(61, 50, 41, 0.5)' : 'rgba(210, 105, 30, 0.08)'), opacity: isAchieved ? 1 : 0.6}}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <span style={{fontSize: '24px'}}>{ach.icon}</span>
                      <span style={{fontWeight: isAchieved ? '600' : '400', color: theme.text}}>{ach.title}</span>
                    </span>
                    <span style={{fontSize: '14px', fontWeight: '500', color: isAchieved ? ach.color : theme.textSecondary}}>{ach.threshold}%</span>
                  </div>
                );
              })}
            </div>
            
            <div style={{marginTop: '16px', padding: '12px', borderRadius: '12px', backgroundColor: theme.accentLight}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: theme.text}}>
                <span>Progress</span>
                <span style={{fontWeight: 'bold'}}>{foundCount} / {totalWords} words</span>
              </div>
              <div style={{height: '8px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: darkMode ? '#3d322a' : '#F5DEB3'}}>
                <div style={{height: '100%', borderRadius: '9999px', width: `${percentage}%`, background: 'linear-gradient(90deg, #DEB887, #D2691E, #8B4513)'}} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jukebox Modal */}
      {showJukebox && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px'}} onClick={() => setShowJukebox(false)}>
          <div style={{backgroundColor: theme.cardBgSolid, border: `3px solid ${theme.cardBorder}`, borderRadius: '24px', padding: '20px', maxWidth: '340px', width: '100%', position: 'relative', boxShadow: '0 25px 50px rgba(0,0,0,0.5)'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowJukebox(false)} style={{position: 'absolute', top: '12px', right: '12px', padding: '4px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: theme.textSecondary, fontSize: '18px'}}>✕</button>
            
            <div style={{textAlign: 'center', marginBottom: '12px'}}>
              <div style={{fontSize: '28px', marginBottom: '4px'}}>🎵</div>
              <h2 style={{fontSize: '20px', fontWeight: 'bold', color: theme.text}}>Jukebox</h2>
            </div>
            
            <div style={{borderRadius: '12px', padding: '12px', marginBottom: '12px', background: 'linear-gradient(135deg, #5D4E37, #3D3229)', color: '#F5DEB3'}}>
              <p style={{fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8}}>Now Playing</p>
              <p style={{fontWeight: '600', fontSize: '16px'}}>{currentTrack || 'Select a track'}</p>
              
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginTop: '8px'}}>
                <button onClick={togglePlayPause} style={{width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #D2691E, #8B4513)', border: '2px solid #CD853F', cursor: 'pointer', fontSize: '16px', color: '#FFF8DC'}}>
                  {isPlaying ? '⏸' : '▶'}
                </button>
              </div>
              
              <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px'}}>
                <span style={{fontSize: '14px'}}>🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  style={{flex: 1, height: '6px', borderRadius: '9999px', cursor: 'pointer', accentColor: '#D2691E'}}
                />
              </div>
            </div>
            
            <p style={{fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', color: theme.textSecondary}}>Playlist</p>
            <div>
              {JUKEBOX_TRACKS.map(track => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(track.name)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: currentTrack === track.name ? (darkMode ? '#5D4E37' : '#F5DEB3') : theme.accentLight,
                    color: theme.text,
                    border: currentTrack === track.name ? `2px solid ${theme.cardBorder}` : '2px solid transparent',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  <span style={{fontSize: '16px'}}>{track.icon}</span>
                  <span style={{fontWeight: '500', flex: 1}}>{track.name}</span>
                  {currentTrack === track.name && isPlaying && <span style={{fontSize: '10px', color: theme.accent}}>♪</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {showComplete && (
        <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40, padding: '16px'}} onClick={() => setShowComplete(false)}>
          <div style={{backgroundColor: theme.cardBgSolid, border: `4px solid ${theme.cardBorder}`, borderRadius: '24px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center'}} onClick={e => e.stopPropagation()}>
            <div style={{fontSize: '64px', marginBottom: '16px'}}>👑</div>
            <h2 style={{fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', color: theme.text}}>Cafe Legend!</h2>
            <p style={{fontSize: '18px', marginBottom: '8px', color: theme.textSecondary}}>You found all {totalWords} words!</p>
            <p style={{fontSize: '14px', marginBottom: '16px', fontStyle: 'italic', color: theme.accent}}>Your legend will be told at the Letter Griddle Cafe for generations.</p>
            <div style={{display: 'flex', justifyContent: 'center', gap: '8px', fontSize: '28px', marginBottom: '16px'}}>
              🎵 ☕ 🍯 🧈 🥞 👑
            </div>
            <button
              onClick={shareResults}
              style={{
                padding: '16px 32px',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #DEB887 0%, #D2691E 50%, #8B4513 100%)',
                color: '#FFF8DC',
                border: '2px solid #5D4E37'
              }}
            >
              Share Your Victory
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{textAlign: 'center', padding: '16px', fontSize: '12px', color: theme.textLight}}>
        <p>Part of <a href="/" style={{color: theme.textLight, textDecoration: 'underline'}}>The Letter Griddle Cafe</a></p>
        <p style={{marginTop: '4px'}}>
          <a href="https://www.lettergriddle.com/privacy" style={{color: theme.textLight, textDecoration: 'underline'}}>Privacy</a>
          {' • '}
          <a href="https://www.lettergriddle.com/terms" style={{color: theme.textLight, textDecoration: 'underline'}}>Terms</a>
        </p>
        <p style={{marginTop: '4px'}}>© {currentYear} Letter Griddle Cafe</p>
      </footer>
    </div>
  );
}