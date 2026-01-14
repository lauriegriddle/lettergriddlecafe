'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// PUZZLE DATA - Add more puzzles here for daily rotation
// Puzzles rotate at 7 AM EST daily
// =============================================================================

const PUZZLES = [
  {
    id: 'griddles-puzzle',
    subtitle: 'Prepare the Cafe',
    letters: ['I', 'G', 'S', 'R', 'E', 'D', 'L'], // Pre-shuffled for initial display
    keyLetters: ['G', 'R'],
    totalWordCount: 75, // Updated: 74 + 1 new word (EDGIER)
    words: {
      4: ['DREG', 'GIRD', 'GIRL', 'GRID', 'RIGS'],
      5: ['DIRGE', 'DREGS', 'EDGER', 'GIRDS', 'GIRLS', 'GREED', 'GRIDE', 'GRIDS', 'GRILL', 'LIGER', 'RIDGE', 'SERGE'],
      6: ['DIGGER', 'DIRGES', 'DREDGE', 'EDGERS', 'EDGIER', 'EGGIER', 'EGRESS', 'GILDER', 'GIRDED', 'GIRDLE', 'GIRLIE', 'GLIDER', 'GREEDS', 'GRIDES', 'GRILLE', 'GRILLS', 'GRILSE', 'LEDGER', 'LIGERS', 'REGILD', 'RIDGED', 'RIDGES', 'RIGGED', 'RIGGER', 'SERGED', 'SERGER', 'SERGES', 'SIEGER'],
      7: ['DIGGERS', 'DIGRESS', 'DREDGED', 'DREDGES', 'GILDERS', 'GIRDLES', 'GIRLIES', 'GLIDERS', 'GRIDDED', 'GRIDDLE', 'GRILLED', 'GRILLER', 'GRILLES', 'LEDGERS', 'REGILDS', 'REGRESS', 'RIGGERS', 'SERGERS', 'SIEGERS'],
      8: ['EGRESSES', 'GREEDIER', 'GRIDDLED', 'GRIDDLER', 'GRIDDLES', 'GRILLERS'],
      9: ['DIGRESSED', 'DIGRESSES', 'GRIDDLERS', 'REGRESSED', 'REGRESSES']
    },
    hints: {
      4: [
        "Sediment at the bottom of a drink",
        "To encircle or prepare for action",
        "Young female",
        "Network of lines crossing each other",
        "Sets up equipment or sails"
      ],
      5: [
        "Mournful song for the dead",
        "The last drops with sediment",
        "Tool for trimming lawn edges",
        "Encircles or prepares",
        "Young females",
        "Excessive desire for wealth",
        "To make a harsh scraping sound",
        "Networks of crossing lines",
        "Cooking surface with bars",
        "Lion and tiger hybrid",
        "Long narrow hilltop",
        "Strong twilled fabric"
      ],
      6: [
        "One who digs holes",
        "Mournful funeral songs",
        "Scoop from the bottom",
        "Lawn edge trimming tools",
        "More nervous or irritable; more daring",
        "More like an egg in taste or texture",
        "A way out or exit",
        "One who applies gold leaf",
        "Encircled or prepared",
        "Belt or undergarment",
        "Characteristic of girls",
        "Aircraft without an engine",
        "Instances of excessive desire",
        "Makes harsh scraping sounds",
        "Metal grating or car front",
        "Cooks on a grated surface",
        "Young Atlantic salmon",
        "Book of financial accounts",
        "Lion-tiger hybrids",
        "To apply gold coating again",
        "Having raised lines",
        "Long narrow hilltops",
        "Set up dishonestly",
        "One who rigs equipment",
        "Finished with overcast stitching",
        "Machine that overcast stitches",
        "Strong twilled fabrics",
        "One who lays siege"
      ],
      7: [
        "Those who dig holes",
        "Stray from the subject",
        "Scooped from bottom",
        "Scoops from the bottom",
        "Those who apply gold leaf",
        "Belts or undergarments",
        "Informal term for girls",
        "Engineless aircraft",
        "Marked with a grid pattern",
        "Flat cooking surface",
        "Cooked on a grill",
        "One who grills food",
        "Metal gratings",
        "Financial account books",
        "Applies gold coating again",
        "Return to a former or less developed state",
        "Those who rig equipment",
        "Overcast stitch machines",
        "Those who lay siege"
      ],
      8: [
        "Multiple ways out",
        "More excessively wanting",
        "Cooked on a flat surface",
        "One who uses a griddle (cafe special!)",
        "Flat cooking surfaces",
        "Those who grill food"
      ],
      9: [
        "Strayed from the subject",
        "Strays from the subject",
        "Those who use griddles (cafe specials!)",
        "Returned to a former state",
        "Returns to a former state",
      ]
    }
  },
  // PUZZLE 2: BETOKENS
  {
    id: 'betokens-puzzle',
    subtitle: 'Prepare the Cafe',
    letters: ['T', 'E', 'O', 'B', 'N', 'K', 'S'],
    keyLetters: ['O', 'N'],
    totalWordCount: 76,
    words: {
      4: ['BONE', 'BONK', 'BOON', 'EBON', 'EONS', 'KENO', 'KNOB', 'KNOT', 'NOBS', 'NOES', 'NONE', 'NOOK', 'NOON', 'NOSE', 'NOTE', 'ONES', 'SNOB', 'SNOT', 'SONS', 'SOON', 'TONE', 'TONS', 'TOON'],
      5: ['BETON', 'BONES', 'BONKS', 'BONNE', 'BOONS', 'EBONS', 'KENOS', 'KNOBS', 'KNOTS', 'NONES', 'NOOKS', 'NOONS', 'NOOSE', 'NOSES', 'NOTES', 'ONSET', 'SNOBS', 'SNOEK', 'SNOOK', 'SNOTS', 'STENO', 'STONE', 'STONK', 'TOKEN', 'TONES', 'TONNE', 'TOONS'],
      6: ['BETONS', 'BONNES', 'BONBON', 'BONNET', 'BOTNET', 'KETONE', 'NOOSES', 'ONSETS', 'SNOOKS', 'SONNET', 'STENOS', 'STONES', 'STONKS', 'TOKENS', 'TONNES'],
      7: ['BETOKEN', 'BONBONS', 'BONESET', 'BONNETS', 'BOTNETS', 'KETONES', 'SONNETS'],
      8: ['BETOKENS', 'BONESETS', 'NOTEBOOK'],
      9: ['NOTEBOOKS']
    },
    hints: {
      4: [
        "Skeletal structure piece",
        "Hit on the head",
        "Blessing or benefit",
        "Dark black wood color",
        "Long periods of time",
        "Bingo-like gambling game",
        "Round door handle",
        "Tied rope fastening",
        "Wealthy or important people (slang)",
        "Plural of no",
        "Not any; zero",
        "Cozy corner for reading",
        "Midday; 12 o'clock",
        "Organ for smelling",
        "Written message or musical sound",
        "Single units; individuals",
        "Pretentious person",
        "Nasal mucus (informal)",
        "Male offspring",
        "In a short time",
        "Sound quality or shade",
        "Units of weight (2000 lbs)",
        "Cartoon character; animated show"
      ],
      5: [
        "Type of concrete mixture",
        "Skeletal pieces",
        "Hits on the head",
        "French word for good (feminine)",
        "Benefits or blessings",
        "Dark black colors",
        "Bingo-like games",
        "Round door handles",
        "Tied fastenings",
        "Midday prayers; not any (plural)",
        "Cozy reading corners",
        "Multiple middays",
        "Loop for hanging",
        "Smelling organs",
        "Written messages",
        "Beginning; start",
        "Pretentious people",
        "South African fish",
        "Type of fish; billiards shot",
        "Nasal mucus (plural)",
        "Shorthand typist",
        "Rock; fruit seed",
        "Military bombardment (British)",
        "Symbol representing something",
        "Shades or sounds",
        "Metric ton",
        "Cartoon characters"
      ],
      6: [
        "Concrete mixtures",
        "French maids (historical)",
        "Small chocolate candy",
        "Hat tied under chin",
        "Network of infected computers",
        "Chemical compound in metabolism",
        "Hanging loops",
        "Beginnings; attacks",
        "Types of fish",
        "14-line poem",
        "Shorthand typists",
        "Rocks; throws rocks at",
        "Military bombardments",
        "Symbols; subway fares",
        "Metric tons"
      ],
      7: [
        "To signify or indicate",
        "Small chocolate candies",
        "Medicinal herb plant",
        "Hats tied under chin",
        "Networks of infected computers",
        "Chemical compounds",
        "14-line poems"
      ],
      8: [
        "Signifies or indicates (pangram!)",
        "Medicinal herb plants",
        "Bound pages for writing"
      ],
      9: [
        "Bound pages for writing (plural)",
      ],
    }
  },
  // PUZZLE 3: CINNAMONS
  {
    id: 'cinnamons-puzzle',
    subtitle: 'Choices',
    letters: ['C', 'N', 'M', 'I', 'A', 'O', 'S'],
    keyLetters: ['N', 'I'],
    totalWordCount: 70,
    words: {
      4: ['AINS', 'ANIS', 'CAIN', 'COIN', 'ICON', 'INCA', 'INNS', 'IONS', 'MAIN', 'MINI', 'OMNI', 'SINS'],
      5: ['ANIMA', 'AMINO', 'AMNIO', 'ANION', 'CAINS', 'COINS', 'CONIC', 'ICONS', 'INCAS', 'MAINS', 'MANIA', 'MANIC', 'MANIS', 'MINIS', 'OMNIS', 'ONION', 'SCION', 'SONIC'],
      6: ['AMINOS', 'AMNION', 'AMNIOS', 'ANIMAS', 'ANIONS', 'CASINO', 'CONICS', 'ICONIC', 'MANIAC', 'MANIAS', 'MANICS', 'MINION', 'MONISM', 'ONIONS', 'SCIONS', 'SIMIAN', 'SONICS'],
      7: ['AMNIONS', 'ANIMISM', 'CASINOS', 'MANIACS', 'MANSION', 'MASONIC', 'MINIONS', 'MISSION', 'MONISMS', 'SIMIANS'],
      8: ['ANIMISMS', 'CINNAMON', 'MANSIONS', 'MISSIONS', 'MOCCASIN', 'OCCASION', 'OMISSION'],
      9: ['CINNAMONS', 'MOCCASINS', 'OCCASIONS', 'OMISSIONS'],
      10: ['COMMISSION'],
      11: ['COMMISSIONS']
    },
    hints: {
      4: [
        "Plural of ain (Scottish word for own)",
        "Anise-flavored seeds",
        "Biblical son of Adam",
        "Metal money",
        "Small religious image",
        "Ancient Peruvian empire member",
        "Lodging houses",
        "Electrically charged atoms",
        "Principal; most important",
        "Very small version",
        "All-inclusive; universal (prefix)",
        "Wrongful acts"
      ],
      5: [
        "Soul in Hindu philosophy",
        "Organic compound with nitrogen",
        "Fetal membrane",
        "Ion with negative charge",
        "Biblical murderers (plural)",
        "Metal money pieces",
        "Shaped like a cone",
        "Religious images",
        "Ancient Peruvians",
        "Principal points",
        "Obsessive enthusiasm",
        "Wildly enthusiastic",
        "Cassava plants (alternate)",
        "Very small versions",
        "Universal; all-inclusive",
        "Layered vegetable that makes you cry",
        "Descendant; offspring",
        "Relating to sound"
      ],
      6: [
        "Organic compounds with nitrogen",
        "Innermost fetal membrane",
        "Fetal membranes",
        "Souls in Hindu philosophy",
        "Negatively charged ions",
        "Gambling establishment",
        "Cone-shaped things (math term)",
        "Symbolic; representing something",
        "Person with obsessive enthusiasm",
        "Obsessive enthusiasms",
        "Wildly enthusiastic people",
        "Loyal follower (yellow ones too!)",
        "Belief in one ultimate reality",
        "Layered veggies that make you cry",
        "Descendants; offspring (plural)",
        "Relating to apes",
        "Relating to sound (plural)"
      ],
      7: [
        "Innermost fetal membranes",
        "Belief that all things have souls",
        "Gambling establishments",
        "People with obsessive enthusiasm",
        "Large stately house",
        "Relating to Freemasons",
        "Loyal followers (yellow ones too!)",
        "Task or assignment",
        "Beliefs in one ultimate reality",
        "Relating to apes (plural)"
      ],
      8: [
        "Beliefs that all things have souls",
        "Warm brown spice from bark",
        "Large stately houses",
        "Tasks or assignments",
        "Native American soft leather shoe",
        "Special event or happening",
        "Something left out or not done"
      ],
      9: [
        "Warm brown spices from bark (pangram!)",
        "Native American soft leather shoes (pangram!)",
        "Special events or happenings",
        "Things left out or not done"
      ],
      10: [
        "Fee paid to a salesperson; or a formal group assigned a task"
      ],
      11: [
        "Fees paid to salespeople; or formal groups assigned tasks (pangram!)"
      ]
    }
  },
// PUZZLE: CELEBRATE
  {
    id: 'celebrate-puzzle',
    subtitle: 'Party Time',
    letters: ['C', 'L', 'B', 'R', 'T', 'E', 'A'],
    keyLetters: ['E', 'A'],
    totalWordCount: 104,
    words: {
      4: ['ABLE', 'ACER', 'ACRE', 'ALEC', 'ALEE', 'AREA', 'BABE', 'BALE', 'BARE', 'BATE', 'BEAR', 'BEAT', 'BETA', 'BRAE', 'CARE', 'EARL', 'LACE', 'LATE', 'RACE', 'RARE', 'RATE', 'REAL', 'REAR', 'TALE', 'TEAL', 'TEAR'],
      5: ['ABLER', 'ACERB', 'ALERT', 'ALTER', 'BABEL', 'BALER', 'BARER', 'BLARE', 'BLEAR', 'BLEAT', 'BRACE', 'CABER', 'CABLE', 'CARER', 'CARET', 'CARLE', 'CATER', 'CLEAR', 'CLEAT', 'CRATE', 'EATER', 'ELATE', 'LABEL', 'LACER', 'LATER', 'RACER', 'RARER', 'RATER', 'REACT', 'TABLE', 'TRACE', 'TREAT'],
      6: ['BALLET', 'BARBER', 'BARREL', 'BATTER', 'BATTLE', 'BEARER', 'BEATER', 'BRACER', 'CABLER', 'CALLER', 'CAREER', 'CARREL', 'CARTEL', 'CARTER', 'CATTLE', 'CELLAR', 'CEREAL', 'CLARET', 'CRATER', 'CREATE', 'LATTER', 'RATTER', 'RATTLE', 'REALER', 'RECALL', 'RECTAL', 'RELATE', 'TABLET', 'TALLER', 'TARTER', 'TRACER'],
      7: ['BATTLER', 'BLABBER', 'BLATTER', 'BLEATER', 'CATERER', 'CLATTER', 'CLEARER', 'LABELER', 'RATTLER', 'RETREAT', 'TERRACE', 'TREACLE', 'TREATER'],
      8: ['BEATABLE'],
      9: ['CELEBRATE'],
    },
    // CELEBRATE PUZZLE - CORRECTED HINTS
// Replace your current hints section with this:

    hints: {
      4: [
        "Capable of doing something",
        "Maple tree genus",
        "Unit of land measurement",
        "A man's name, short for Alexander",
        "On the sheltered side (nautical)",
        "A region or space",
        "Infant; baby",
        "Bundle of hay",
        "Without covering; naked",
        "To soak leather in alkaline solution",
        "Large furry mammal",
        "To defeat; rhythm",
        "Greek letter; test version",
        "Hillside (Scottish)",
        "Feel concern; look after",
        "British nobleman",
        "Delicate fabric trim",
        "Not on time",
        "Competition of speed",
        "Not common; undercooked",
        "Speed; charge per unit",
        "Actual; genuine",
        "Back part; raise (children)",
        "Story; narrative",
        "Blue-green color; a duck",
        "Rip; drop of sadness"
      ],
      5: [
        "More capable",
        "Sour; bitter tasting",
        "Warning signal; watchful",
        "Change; modify",
        "Tower of confusion (biblical)",
        "One who bales hay",
        "More naked; more empty",
        "Loud sound; horn noise",
        "Dim or blurred (eyes)",
        "Cry of a sheep or goat",
        "Arm support; strengthen",
        "Pole used in Scottish games",
        "Wire for TV or electricity",
        "One who provides care",
        "Proofreader's mark (^)",
        "A peasant; rustic fellow",
        "Provide food service",
        "Transparent; obvious",
        "T-shaped fastener on a boat",
        "Wooden shipping box",
        "One who consumes food",
        "Make very happy",
        "Tag for identification",
        "One who laces",
        "Afterward; more late",
        "One who races; sports car",
        "More uncommon",
        "One who rates or evaluates",
        "Respond to a stimulus",
        "Furniture for dining",
        "Follow a path; small amount",
        "Special food; handle medically"
      ],
      6: [
        "Classical dance form",
        "One who cuts hair",
        "Cylindrical container; gun part",
        "One who bats; cake mixture",
        "Armed conflict; fight",
        "One who carries something",
        "Kitchen mixer tool",
        "Wrist support; something that braces",
        "One who installs cables",
        "One who calls; visitor",
        "Profession; job path",
        "Library study cubicle",
        "Business alliance; price-fixing group",
        "One who drives a cart",
        "Cows and bulls",
        "Underground storage room",
        "Breakfast grain food",
        "Deep red wine color",
        "Volcanic hole; moon pit",
        "Make; bring into existence",
        "Second of two; more recent",
        "Dog that catches rats",
        "Baby's shaking toy",
        "More genuine (informal)",
        "Remember; call back",
        "Relating to the rectum",
        "Tell; have connection to",
        "Flat slab; pill",
        "More tall",
        "More sour or acidic",
        "One who traces; bullet type"
      ],
      7: [
        "One who fights battles",
        "One who talks too much",
        "One who blatters (rare word)",
        "Sheep or goat making sounds",
        "One who provides food service",
        "Loud rattling noise",
        "More transparent",
        "One who applies labels",
        "Venomous snake; baby toy",
        "Go back; place of seclusion",
        "Outdoor patio area",
        "British golden syrup",
        "One who treats patients"
      ],
      8: [
        "Able to be defeated"
      ],
      9: [
        "Have a party; honor a special occasion (pangram!)"
      ]
    }
    },
  
  // PUZZLE: CUPCAKES
  {
    id: 'cupcakes-puzzle',
    subtitle: 'Sweet Treats',
    letters: ['C', 'U', 'P', 'A', 'K', 'E', 'S'],
    keyLetters: ['S', 'E'],
    totalWordCount: 35,
    words: {
      4: ['APSE', 'CASE', 'CUES', 'EASE', 'EKES', 'PECS', 'SEEK', 'SEEP', 'SEES', 'SPEC', 'SUES', 'USES'],
      5: ['CAKES', 'CAPES', 'CASES', 'CAUSE', 'CEASE', 'EASES', 'KEEPS', 'PECKS', 'PEEKS', 'PUKES', 'SEEKS', 'SEEPS', 'SPEAK', 'SPECK', 'SPECS'],
      6: ['CAUSES', 'CEASES', 'CUSSES', 'ESCAPE', 'PUSSES', 'SPEAKS', 'SPECKS'],
      7: ['ESCAPES'],
    },
    // CUPCAKES PUZZLE - HINTS
// Replace your current CUPCAKES hints section with this:

    hints: {
      4: [
        "Semicircular church recess",
        "Container; situation",
        "Signals to an actor",
        "Comfort; lack of difficulty",
        "Manages to get by barely",
        "Chest muscles (slang)",
        "Look for; search",
        "Leak slowly; ooze",
        "Views; observes",
        "Specification (abbrev.)",
        "Takes to court; legal action",
        "Employs; makes use of"
      ],
      5: [
        "Birthday party desserts",
        "Superhero garments; geographic features",
        "Containers; situations",
        "Reason; something that produces an effect",
        "Stop; come to an end",
        "Comforts; relaxes",
        "Retains; holds onto",
        "Bird bites; quick kisses",
        "Quick glances; sneak looks",
        "Vomits (slang)",
        "Searches for",
        "Oozes; leaks slowly",
        "Talks; communicates verbally",
        "Small dot; tiny bit",
        "Specifications (abbrev.)"
      ],
      6: [
        "Reasons; things that produce effects",
        "Stops; comes to an end",
        "Uses swear words",
        "Flee; get away from",
        "Cats (informal)",
        "Talks; communicates",
        "Small dots; tiny bits"
      ],
      7: [
        "Flees from danger; getaways (pangram!)"
      ]
    },
  },
  // PUZZLE: BOOKENDS
  {
    id: 'bookends-puzzle',
    subtitle: 'On the Shelves',
    letters: ['B', 'K', 'N', 'D', 'S', 'O', 'E'],
    keyLetters: ['O', 'N'],
    totalWordCount: 40,
    words: {
      4: ['BONE', 'BONK', 'BOON', 'DONE', 'DONS', 'EBON', 'EONS', 'KNOB', 'NODE', 'NODS', 'NOSE', 'ONES', 'SNOB', 'SONE', 'SONS'],
      5: ['BONED', 'BONES', 'BONKS', 'BOONS', 'EBONS', 'KENDO', 'KNOBS', 'NODES', 'NOSED', 'NOSES', 'SNOBS', 'SNOEK', 'SNOOD', 'SONDE'],
      6: ['BONKED', 'DONEES', 'DONNED', 'KENDOS', 'SNOODS', 'SNOOKS', 'SONDES'],
      7: ['BOOKEND', 'DEBONES', 'SNOOKED'],
      8: ['BOOKENDS'],
    },
    hints: {
      4: [
        "Skeletal part; study hard",
        "Hit on the head (informal)",
        "Blessing; benefit",
        "Finished; completed",
        "Puts on clothing",
        "Dark black wood color",
        "Long periods of time",
        "Round door handle",
        "Connection point; lump",
        "Head bobs; agrees silently",
        "Facial feature for smelling",
        "Single units; numbers",
        "Person who acts superior",
        "Unit of loudness",
        "Male children"
      ],
      5: [
        "Removed bones from fish",
        "Skeletal parts",
        "Hits on the head",
        "Blessings; benefits",
        "Dark black woods",
        "Japanese sword fighting art",
        "Round door handles",
        "Connection points",
        "Detected by smelling",
        "Facial features for smelling",
        "People who act superior",
        "Type of fish (South African)",
        "Hair net worn at back of head",
        "Device to measure ocean depth"
      ],
      6: [
        "Hit on the head (past tense)",
        "Recipients of donations",
        "Put on (clothing, past tense)",
        "Japanese sword fighting arts",
        "Hair nets worn at back of head",
        "Billiard shots; nosy people",
        "Ocean depth measuring devices"
      ],
      7: [
        "Decorative item holding books upright",
        "Removes bones from meat",
        "Made a billiard shot"
      ],
      8: [
        "Decorative items that hold books upright on a shelf (pangram!)"
      ]
    }
  },
  // PUZZLE: CASHMERE
  {
    id: 'cashmere-puzzle',
    subtitle: 'Cozy and Warm',
    letters: ['C', 'A', 'S', 'H', 'M', 'E', 'R'],
    keyLetters: ['E', 'A'],
    totalWordCount: 55,
    words: {
      4: ['ACHE', 'ACRE', 'CAME', 'CARE', 'CASE', 'EACH', 'HAEM', 'HARE', 'MACE', 'MARE', 'RACE', 'REAM', 'SEAM', 'SEAR', 'SHEA'],
      5: ['ACHES', 'ACMES', 'ACRES', 'CARES', 'CHARE', 'CHASE', 'CREAM', 'HAREM', 'HARES', 'MACES', 'MARES', 'REACH', 'REAMS', 'SCARE', 'SEAMS', 'SHAME', 'SHARE', 'SHEAR', 'SMEAR'],
      6: ['ARCHES', 'CHASER', 'CREAMS', 'ESCHAR', 'HAREMS', 'MASHER', 'SCREAM', 'SCHEMA', 'SEARCH', 'SHAMES', 'SHARES', 'SHEARS', 'SMEARS'],
      7: ['CHASERS', 'MARCHES', 'MASHERS', 'REMARCH', 'SCHEMAS', 'SCREAMS', 'SMASHER'],
      8: ['CASHMERE']
    },
    hints: {
      4: [
        "Dull persistent pain",
        "Unit of land measurement",
        "Arrived; past tense of come",
        "Feel concern; look after",
        "Container; situation",
        "Every one separately",
        "Iron compound in blood",
        "Long-eared rabbit relative",
        "Medieval spiked weapon",
        "Female horse",
        "Speed competition",
        "500 sheets of paper",
        "Line where fabric is sewn",
        "Burn the surface",
        "Tree with nuts for butter"
      ],
      5: [
        "Dull persistent pains",
        "Highest points; peaks",
        "Land measurement units",
        "Feels concern for",
        "Pursue eagerly (archaic)",
        "Run after to catch",
        "Dairy product; best part",
        "Group of wives",
        "Rabbit relatives",
        "Medieval weapons",
        "Female horses",
        "Extend arm to grab",
        "Packs of 500 sheets",
        "Frighten away",
        "Sewn lines in fabric",
        "Feeling of embarrassment",
        "Portion given to others",
        "Cut wool from sheep",
        "Spread messily"
      ],
      6: [
        "Curved doorways",
        "One who pursues",
        "Dairy products",
        "Burn scab or crust",
        "Groups of wives",
        "One who mashes",
        "Loud piercing cry",
        "Diagram; plan",
        "Look thoroughly",
        "Causes embarrassment",
        "Portions; parts",
        "Wool cutting tools",
        "Messy spreads"
      ],
      7: [
        "Those who pursue",
        "Walking protests; military moves",
        "Those who mash",
        "March again",
        "Diagrams; plans",
        "Loud piercing cries",
        "One who breaks things"
      ],
      8: [
        "Luxuriously soft wool from goats (pangram!)"
      ]
    }
  },

  // PUZZLE: KINDNESS
  {
    id: 'kindness-puzzle',
    subtitle: 'Acts of Care',
    letters: ['K', 'I', 'N', 'D', 'E', 'S'],
    keyLetters: ['N', 'I'],
    totalWordCount: 33,
    words: {
      4: ['DINE', 'DINK', 'DINS', 'INKS', 'INNS', 'KIND', 'KINE', 'KINS', 'NIDE', 'NINE', 'SINE', 'SINK', 'SKIN'],
      5: ['DINED', 'DINES', 'DINKS', 'INDIE', 'KINDS', 'KINES', 'NINES', 'SINES', 'SINKS', 'SKEIN', 'SKINS', 'SNIDE'],
      6: ['DINNED', 'INDIES', 'KINKED', 'SINNED', 'SKEINS'],
      7: ['DINKIES', 'SKINNED'],
      8: ['KINDNESS']
    },
    hints: {
      4: [
        "Eat an evening meal",
        "Small dent; tennis term",
        "Loud noises",
        "Pen fluids",
        "Hotels; pubs",
        "Type or sort; nice",
        "Archaic word for cows",
        "Family members",
        "Nest of pheasants",
        "Number after eight",
        "Trigonometry function",
        "Basin for washing dishes",
        "Outer body covering"
      ],
      5: [
        "Ate dinner",
        "Eats evening meals",
        "Small dents",
        "Independent music or film",
        "Types; sorts",
        "Archaic for cows (plural)",
        "Number 9 multiples",
        "Trig functions",
        "Wash basins",
        "Bundle of yarn",
        "Outer coverings",
        "Scornfully mocking"
      ],
      6: [
        "Rang repeatedly",
        "Independent films (plural)",
        "Twisted or tangled",
        "Did wrong; transgressed",
        "Bundles of yarn"
      ],
      7: [
        "Small cute things",
        "Removed the hide"
      ],
      8: [
        "Quality of being friendly and generous (pangram!)"
      ]
    }
  },

  // PUZZLE: SWEATER  
  {
    id: 'sweater-puzzle',
    subtitle: 'Cable Knit',
    letters: ['S', 'W', 'E', 'A', 'T', 'R'],
    keyLetters: ['E', 'A'],
    totalWordCount: 58,
    words: {
      4: ['AREA', 'ARES', 'EARS', 'EASE', 'EAST', 'EATS', 'ERAS', 'ETAS', 'RATE', 'SATE', 'SEAR', 'SEAT', 'SERA', 'TARE', 'TEAR', 'TEAS', 'WARE', 'WEAR'],
      5: ['AREAS', 'ASTER', 'EATER', 'ERASE', 'RATES', 'RESAT', 'SATES', 'SEARS', 'SEATS', 'SETAE', 'STARE', 'SWEAR', 'TARES', 'TEARS', 'TEASE', 'WARES', 'WASTE', 'WATER', 'WEARS'],
      6: ['EATERS', 'ERASER', 'ERASES', 'RAREST', 'SEATER', 'STARER', 'SWEARS', 'TEASER', 'TEASES', 'WASTER', 'WASTES', 'WATERS'],
      7: ['SEATERS', 'STARERS', 'SWEARER', 'SWEATER', 'TEASERS', 'WASTERS'],
      8: ['SWEATERS', 'SWEARERS']
    },
    hints: {
      4: [
        "Region; space",
        "Greek god of war (plural)",
        "Hearing organs",
        "Freedom from difficulty",
        "Direction of sunrise",
        "Consumes food",
        "Historical time periods",
        "Greek letters",
        "Speed; price per unit",
        "Satisfy fully",
        "Burn surface; search",
        "Place to sit",
        "Blood fluid (plural)",
        "Weed among grain",
        "Rip; eye drop",
        "Hot beverages",
        "Goods; merchandise",
        "Have on one's body"
      ],
      5: [
        "Regions; spaces",
        "Star-shaped flower",
        "One who consumes food",
        "Remove writing",
        "Speeds; prices",
        "Sat again",
        "Fully satisfies",
        "Burns surfaces",
        "Places to sit",
        "Bristle-like structures",
        "Look fixedly",
        "Declare under oath",
        "Weeds among grain",
        "Rips; eye drops",
        "Make fun of playfully",
        "Merchandise items",
        "Squander; trash",
        "H2O liquid",
        "Has on one's body"
      ],
      6: [
        "Those who consume food",
        "Pencil mark remover",
        "Rubs out writing",
        "Most uncommon",
        "One who seats people",
        "One who gazes fixedly",
        "Declares under oath",
        "One who mocks playfully",
        "Mocks playfully",
        "One who squanders",
        "Squanders; trash bins",
        "H2O; irrigates"
      ],
      7: [
        "Those who seat people",
        "Those who gaze fixedly",
        "One who swears oaths",
        "Knitted garment for upper body (pangram!)",
        "Those who mock playfully",
        "Those who squander"
      ],
      8: [
        "Knitted garments (pangram plural!)",
        "Those who swear oaths"
      ]
    }
  },

  // PUZZLE: DRAWING
  {
    id: 'drawing-puzzle',
    subtitle: 'Art Class',
    letters: ['D', 'R', 'A', 'W', 'I', 'N', 'G'],
    keyLetters: ['A', 'N'],
    totalWordCount: 24,
    words: {
      4: ['ANNA', 'DANG', 'DARN', 'GAIN', 'GNAW', 'GRAN', 'NAAN', 'RAIN', 'RAND', 'RANG', 'RANI', 'WAIN', 'WAND', 'WARN'],
      5: ['DINAR', 'DRAIN', 'GRAND', 'NADIR'],
      6: ['AWNING', 'RADIAN', 'WADING'],
      7: ['DARNING', 'DRAWING', 'WARNING']
    },
    hints: {
      4: [
        "Former Indian coin",
        "Mild exclamation",
        "Mend a hole; mild curse",
        "Obtain; profit",
        "Chew persistently",
        "Informal for grandmother",
        "Indian flatbread",
        "Water from clouds",
        "South African currency",
        "Made a bell sound",
        "Indian queen",
        "Large farm wagon",
        "Magician's stick",
        "Alert to danger"
      ],
      5: [
        "Middle Eastern currency",
        "Remove liquid; empty",
        "Large and impressive",
        "Lowest point"
      ],
      6: [
        "Roof-like shade cover",
        "Angle measurement unit",
        "Walking in shallow water"
      ],
      7: [
        "Mending holes in fabric",
        "Artwork with pencil or pen (pangram!)",
        "Alerting to danger"
      ]
    }
  },

  // PUZZLE: JACKETS
  {
    id: 'jackets-puzzle',
    subtitle: 'Outerwear',
    letters: ['J', 'A', 'C', 'K', 'E', 'T', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 34,
    words: {
      4: ['ACES', 'CAKE', 'CASE', 'CATE', 'EASE', 'EATS', 'SAKE', 'SATE', 'SEAT', 'TAKE', 'TEAK', 'TEAS'],
      5: ['CAKES', 'CASES', 'CASTE', 'CATES', 'EASES', 'SAKES', 'SEATS', 'SKATE', 'STAKE', 'STEAK', 'TAKES', 'TEAKS', 'TEASE'],
      6: ['CASKET', 'CASTES', 'JACKET', 'SKATES', 'STAKES', 'STEAKS', 'TEASES'],
      7: ['CASKETS', 'JACKETS']
    },
    hints: {
      4: [
        "High cards; experts",
        "Dessert with frosting",
        "Container; situation",
        "Choice food (archaic)",
        "Comfort; freedom from difficulty",
        "Consumes food",
        "Japanese rice wine",
        "Satisfy fully",
        "Place to sit",
        "Grab; capture",
        "Tropical hardwood tree",
        "Hot beverages"
      ],
      5: [
        "Desserts with frosting",
        "Containers; situations",
        "Hindu social class",
        "Choice foods (archaic)",
        "Comforts; relieves",
        "Japanese wines",
        "Places to sit",
        "Glide on ice",
        "Pointed post; wager",
        "Cut of beef",
        "Grabs; captures",
        "Tropical hardwoods",
        "Mock playfully"
      ],
      6: [
        "Burial box",
        "Social classes",
        "Short coat (uses J!)",
        "Glides on ice",
        "Pointed posts; wagers",
        "Cuts of beef",
        "Mocks playfully"
      ],
      7: [
        "Burial boxes",
        "Short coats worn outdoors (pangram!)"
      ]
    }
  },

  // PUZZLE: PANCAKES 🥞
  {
    id: 'pancakes-puzzle',
    subtitle: 'Breakfast at the Cafe',
    letters: ['P', 'A', 'N', 'C', 'K', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 35,
    words: {
      4: ['ACES', 'ACNE', 'APES', 'CAKE', 'CANE', 'CAPE', 'CASE', 'EASE', 'NAPE', 'PACE', 'PANE', 'PEAK', 'PEAS', 'SAKE', 'SANE'],
      5: ['ACNES', 'CAKES', 'CANES', 'CAPES', 'CASES', 'EASES', 'NAPES', 'PACES', 'PANES', 'PECAN', 'PEAKS', 'SNEAK', 'SPEAK'],
      6: ['CANAPE', 'PECANS', 'SNEAKS', 'SPEAKS'],
      7: ['CANAPES', 'PANCAKE'],
      8: ['PANCAKES']
    },
    hints: {
      4: [
        "High cards; experts",
        "Skin condition with pimples",
        "Primates; mimics",
        "Dessert with frosting",
        "Walking stick; sugar plant",
        "Superhero garment",
        "Container; situation",
        "Comfort; freedom from difficulty",
        "Back of the neck",
        "Speed of walking",
        "Window glass section",
        "Mountain top",
        "Green vegetables in pods",
        "Japanese rice wine",
        "Mentally healthy; reasonable"
      ],
      5: [
        "Skin conditions",
        "Desserts with frosting",
        "Walking sticks",
        "Superhero garments",
        "Containers; situations",
        "Comforts; relieves",
        "Backs of necks",
        "Speeds; keeps up with",
        "Window sections",
        "Type of nut",
        "Mountain tops",
        "Move quietly; creep",
        "Talk; communicate"
      ],
      6: [
        "Small appetizer on bread",
        "Types of tree nuts",
        "Moves quietly",
        "Talks; communicates"
      ],
      7: [
        "Small appetizers on bread",
        "Flat breakfast cake on griddle"
      ],
      8: [
        "Flat breakfast cakes - our specialty! (pangram!) 🥞"
      ]
    }
  },
];

// Get yesterday's puzzle dynamically based on rotation
function getYesterdaysPuzzle() {
  const ANCHOR_DATE = new Date('2026-01-05T07:00:00-05:00');
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hour = estTime.getHours();
  const puzzleDate = new Date(estTime);
  
  if (hour < 7) {
    puzzleDate.setDate(puzzleDate.getDate() - 1);
  }
  puzzleDate.setHours(7, 0, 0, 0);
  
  const daysSinceAnchor = Math.floor((puzzleDate - ANCHOR_DATE) / (1000 * 60 * 60 * 24));
  const todayIndex = Math.max(0, daysSinceAnchor) % PUZZLES.length;
  
  // Get PREVIOUS puzzle (wrap around if needed)
  const yesterdayIndex = (todayIndex - 1 + PUZZLES.length) % PUZZLES.length;
  
  return PUZZLES[yesterdayIndex];
}
// =============================================================================
// PUZZLE ROTATION - Get today's puzzle based on 7 AM EST
// =============================================================================

function getTodaysPuzzle() {
  // Anchor: Dec 26, 2025 at 7 AM EST = index 0 (GRIDDLES)
  // Dec 27, 2025 at 7 AM EST = index 1 (BETOKENS)
  const ANCHOR_DATE = new Date('2026-01-05T07:00:00-05:00');
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hour = estTime.getHours();
  const puzzleDate = new Date(estTime);
  
  if (hour < 7) {
    puzzleDate.setDate(puzzleDate.getDate() - 1);
  }
  puzzleDate.setHours(7, 0, 0, 0);
  
  const daysSinceAnchor = Math.floor((puzzleDate - ANCHOR_DATE) / (1000 * 60 * 60 * 24));
  const puzzleIndex = Math.max(0, daysSinceAnchor) % PUZZLES.length;
  
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