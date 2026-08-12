'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

// =============================================================================
// PUZZLE DATA - Add more puzzles here for daily rotation
// Puzzles rotate at 7 AM EST daily
// =============================================================================

const PUZZLES = [
  // PUZZLE 1: PRINTERS - "Welcome to the cafe!" (Feb 16)
  {
    id: 'printers-s2',
    subtitle: 'Welcome to the cafe!',
    letters: ['P', 'R', 'I', 'N', 'T', 'E', 'S'],
    keyLetters: ['E', 'R'],
    totalWordCount: 76,
    words: {
      4: ['IRES', 'PIER', 'REIN', 'RENT', 'REPS', 'REST', 'RIPE', 'RISE', 'RITE', 'SEER', 'SIRE', 'TERN', 'TIER', 'TIRE', 'TREE'],
      5: ['ENTER', 'INERT', 'INTER', 'PREEN', 'PRIER', 'REINS', 'RENTS', 'RIPEN', 'RIPER', 'RISER', 'RITES', 'SEERS', 'SIREN', 'SIRES', 'SNEER', 'SPIRE', 'STEER', 'STERN', 'TERNS', 'TERSE', 'TIERS', 'TIRES', 'TREES', 'TRIER', 'TRIPE'],
      6: ['ENTERS', 'INSERT', 'INTERS', 'PREENS', 'PRIERS', 'RESENT', 'RIPENS', 'RISERS', 'SIRENS', 'SNEERS', 'SNIPER', 'SPIRES', 'SPRITE', 'STEERS', 'STERNS', 'STRIPE', 'TENSER', 'TRIERS', 'TRIPES'],
      7: ['ENTRIES', 'INSERTS', 'PRESENT', 'PRINTER', 'REPENTS', 'REPRINT', 'RESENTS', 'SERPENT', 'SNIPERS', 'SPRITES', 'STRIPES'],
      8: ['PRINTERS', 'PRESENTS', 'REPRINTS', 'SERPENTS', 'SPRINTER'],
      9: ['SPRINTERS']
    },
    hints: {
      4: ["Angers or annoys", "Dock or walkway over water", "Strap to control a horse", "Lease payment; or tear", "Representatives; exercise counts", "Relax; remainder", "Ready to eat; mature", "Go upward; get out of bed", "Ceremony or ritual", "Prophet; one who foresees", "Father; address to a king", "Seabird", "Level or layer", "Rubber wheel covering; grow weary", "Woody plant with trunk and branches"],
      5: ["Go in; type into a computer", "Inactive; not moving", "Bury; place in a grave", "Groom feathers; primp", "One who pries into others' business", "Straps to control a horse", "Lease payments; tears", "Become ready to eat", "More ready to eat; more mature", "Early bird; stair step part", "Ceremonies or rituals", "Prophets; fortune tellers", "Warning sound; mythical sea singer", "Fathers; addresses to kings", "Scornful smile; mock", "Church steeple; pointed tower", "Guide; young bull", "Back of ship; serious", "Seabirds", "Brief and to the point", "Levels or layers", "Rubber wheel coverings", "Woody plants", "One who attempts", "Stomach lining meat; nonsense"],
      6: ["Goes in; types into computer", "Put in; place inside", "Buries; places in graves", "Grooms feathers; primps", "Ones who pry into others' business", "Feel bitter about", "Becomes ready to eat", "Early birds; stair parts", "Warning sounds; mythical singers", "Scornful smiles; mocks", "Hidden shooter", "Church steeples; pointed towers", "Fairy; lemon-lime soda", "Guides; young bulls", "Backs of ships; serious expressions", "Band of color", "More tight; more strained", "Ones who attempt", "Stomach lining meats"],
      7: ["Ways in; items in a list", "Puts in; places inside", "Gift; here now", "Machine that produces documents (pangram!)", "Feels remorse", "Print again", "Feels bitter about", "Snake", "Hidden shooters", "Fairies; lemon-lime sodas", "Bands of color"],
      8: ["Machines that produce documents (pangram!)", "Gifts; here now", "Prints again", "Snakes", "Fast runner"],
      9: ["Fast runners"]
    }
  },
  // PUZZLE 2: ROASTED - "Brew up some words!" (Feb 17)
  {
    id: 'roasted-s2',
    subtitle: 'Brew up some words!',
    letters: ['R', 'O', 'A', 'S', 'T', 'E', 'D'],
    keyLetters: ['A', 'E'],
    totalWordCount: 70,
    words: {
      4: ['AREA', 'DARE', 'DATE', 'DEAR', 'EARS', 'EASE', 'EAST', 'EATS', 'ERAS', 'RATE', 'READ', 'SATE', 'SEAR', 'SEAT', 'TARE', 'TEAS', 'TEAR'],
      5: ['AREAS', 'AROSE', 'ASTER', 'DARES', 'DATES', 'DEARS', 'EASED', 'EATER', 'ERASE', 'ORATE', 'RATED', 'RATES', 'READS', 'SATED', 'SATES', 'SEARS', 'SEATS', 'STARE', 'STEAD', 'TARES', 'TEARS', 'TEASE', 'TRADE', 'TREAD'],
      6: ['ADORES', 'ASTERS', 'EATERS', 'ERASED', 'ERASER', 'ERASES', 'ORATED', 'ORATES', 'RESEAT', 'SEDATE', 'STARED', 'STARER', 'STARES', 'STEADS', 'TEASED', 'TEASER', 'TEASES', 'TRADES', 'TREADS'],
      7: ['ERASERS', 'RESEATS', 'ROASTED', 'ROASTER', 'SEDATES', 'TEASERS', 'TOASTED', 'TOASTER'],
      8: ['ROASTERS', 'TOASTERS']
    },
    hints: {
      4: ["Region; surface space", "Challenge someone; be bold", "Calendar day; romantic outing", "Beloved; expensive", "Hearing organs", "Comfort; lack of difficulty", "Compass direction; sunrise side", "Consumes food", "Historical time periods", "Speed; evaluate or rank", "Look at written words", "Satisfy fully", "Burn the surface; scorch", "Chair; place to sit", "Weed; weight of container", "Hot brewed beverages", "Rip; eye drop"],
      5: ["Regions; surface spaces", "Got up; came into being", "Star-shaped flower", "Challenges; acts boldly", "Calendar days; romantic outings", "Beloved ones", "Made more comfortable", "One who consumes food", "Remove; rub out", "Speak formally; give a speech", "Evaluated; ranked", "Speeds; evaluates", "Looks at written words", "Satisfied fully", "Satisfies fully", "Burns surfaces; scorches", "Chairs; places to sit", "Gaze; look fixedly", "Place; in someone's _____", "Weeds; container weights", "Rips; eye drops", "Playfully mock", "Exchange; business deal", "Walk on; tire pattern"],
      6: ["Loves greatly; worships", "Star-shaped flowers", "Ones who consume food", "Removed; rubbed out", "Tool for removing pencil marks", "Removes; rubs out", "Spoke formally; gave a speech", "Speaks formally; gives speeches", "Seat again", "Calm; give a sedative", "Gazed; looked fixedly", "One who gazes", "Gazes; looks fixedly", "Places", "Playfully mocked", "One who playfully mocks", "Playfully mocks", "Exchanges; business deals", "Walks on; tire patterns"],
      7: ["Tools for removing marks", "Seats again", "Cooked in dry heat (pangram!)", "Pan for cooking in dry heat", "Calms; gives sedatives", "Ones who playfully mock", "Browned with heat; celebrated", "Kitchen appliance for bread"],
      8: ["Pans for cooking in dry heat", "Kitchen appliances for bread"]
    }
  },
  // PUZZLE 3: DETAILS - "You've got this!" (Feb 18)
  {
    id: 'details-s2',
    subtitle: "You've got this!",
    letters: ['D', 'E', 'T', 'A', 'I', 'L', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 66,
    words: {
      4: ['AIDE', 'ALES', 'DALE', 'DATE', 'DEAL', 'EASE', 'EAST', 'EATS', 'IDEA', 'LATE', 'LEAD', 'LEAS', 'SALE', 'SATE', 'SEAL', 'SEAT', 'TALE', 'TEAS'],
      5: ['AIDES', 'AILED', 'AISLE', 'DALES', 'DATES', 'DEALS', 'DELTA', 'EASED', 'EASEL', 'IDEAL', 'IDEAS', 'LEADS', 'LEASE', 'LEAST', 'SALES', 'SATED', 'SATES', 'SEALS', 'SEATS', 'SLATE', 'STALE', 'STEAL', 'TALES', 'TEASE'],
      6: ['AISLES', 'DELTAS', 'DETAIL', 'DILATE', 'EASELS', 'IDEALS', 'LADIES', 'LASTED', 'LEASED', 'LEASES', 'SAILED', 'SALTED', 'SEALED', 'SEDATE', 'SLATED', 'STEALS', 'TAILED', 'TEASED'],
      7: ['DETAILS', 'DILATED', 'DILATES', 'SEDATES'],
      8: ['DETAILED', 'STEADIED']
    },
    hints: {
      4: ["Assistant; helper", "Types of beer", "Valley; glen", "Calendar day; romantic outing", "Agreement; distribute cards", "Comfort; lack of difficulty", "Compass direction; sunrise side", "Consumes food", "Thought; concept", "Not on time; deceased", "Go first; heavy metal", "Meadows; grasslands", "Discount event at a store", "Satisfy fully", "Ocean mammal; close tightly", "Chair; place to sit", "Story; narrative", "Hot brewed beverages"],
      5: ["Assistants; helpers", "Was sick; troubled", "Walkway between seats", "Valleys; glens", "Calendar days; romantic outings", "Agreements; distributes cards", "River mouth; Greek letter", "Made more comfortable", "Art stand for painting", "Perfect; model", "Thoughts; concepts", "Goes first; heavy metals", "Rental agreement", "Smallest amount", "Discount events at stores", "Satisfied fully", "Satisfies fully", "Ocean mammals; closes tightly", "Chairs; places to sit", "Rock; schedule", "Not fresh; old bread", "Take without permission", "Stories; narratives", "Playfully mock"],
      6: ["Walkways between seats", "River mouths; Greek letters", "Specific fact; minor point (pangram!)", "Expand; widen pupils", "Art stands for painting", "Perfections; models", "Women", "Continued; endured", "Rented", "Rental agreements", "Traveled by boat", "Added salt to", "Closed tightly", "Calm; give a sedative", "Scheduled; planned", "Takes without permission", "Followed behind", "Playfully mocked"],
      7: ["Specific facts; minor points (pangram!)", "Expanded; widened", "Expands; widens", "Calms; gives sedatives"],
      8: ["Thorough; explained fully (pangram!)", "Made stable; calmed"]
    }
  },
  // PUZZLE 4: TREASURED - "Pull up a chair!" (Feb 19)
  {
    id: 'treasured-s2',
    subtitle: 'Pull up a chair!',
    letters: ['T', 'R', 'E', 'A', 'S', 'U', 'D'],
    keyLetters: ['E', 'R'],
    totalWordCount: 84,
    words: {
      4: ['DARE', 'DEAR', 'DEER', 'EARS', 'ERRS', 'ERAS', 'RATE', 'READ', 'REAR', 'REDS', 'REED', 'REST', 'RUED', 'RUES', 'RUSE', 'SEAR', 'SEER', 'SURE', 'TEAR', 'TREE', 'TRUE', 'USER'],
      5: ['ASTER', 'DARER', 'DARES', 'DEARS', 'DETER', 'EATER', 'ERASE', 'RATED', 'RATES', 'READS', 'REARS', 'REEDS', 'RESET', 'RESTS', 'REUSE', 'RUSES', 'SEERS', 'STARE', 'STEER', 'SURER', 'TEARS', 'TERSE', 'TRADE', 'TREAD', 'TREED', 'TREES', 'TRUER', 'USERS'],
      6: ['ASTERS', 'DETERS', 'EATERS', 'ERASED', 'ERASER', 'ERASES', 'REREAD', 'RESEAT', 'RESETS', 'RESTED', 'REUSED', 'REUSES', 'RUSTED', 'STARED', 'STARER', 'STARES', 'STEERS', 'SUREST', 'TEASER', 'TRADES', 'TREADS', 'TRUEST'],
      7: ['DEAREST', 'ERASERS', 'READERS', 'REREADS', 'RESEATS', 'RESTATE', 'STEERED', 'TEASERS'],
      8: ['RESTATED', 'RESTATES', 'TREASURE'],
      9: ['TREASURED']
    },
    hints: {
      4: ["Challenge someone; be bold", "Beloved; expensive", "Forest animal with antlers", "Hearing organs", "Makes mistakes", "Historical time periods", "Speed; evaluate or rank", "Look at written words", "Back part; raise children", "Communist colors", "Tall water plant; woodwind part", "Relax; remainder", "Regretted", "Regrets", "Trick; deception", "Burn the surface; scorch", "Prophet; one who foresees", "Certain; confident", "Rip; eye drop", "Woody plant with branches", "Genuine; accurate", "One who uses something"],
      5: ["Star-shaped flower", "One who dares", "Challenges; acts boldly", "Beloved ones", "Discourage; prevent", "One who consumes food", "Remove; rub out", "Evaluated; ranked", "Speeds; evaluates", "Looks at written words", "Back parts; raises children", "Tall water plants", "Start over; restore settings", "Relaxes; remainders", "Use again", "Tricks; deceptions", "Prophets; fortune tellers", "Gaze; look fixedly", "Guide; young bull", "More certain", "Rips; eye drops", "Brief and to the point", "Exchange; business deal", "Walk on; tire pattern", "Chased up a tree", "Woody plants", "More genuine", "Ones who use something"],
      6: ["Star-shaped flowers", "Discourages; prevents", "Ones who consume food", "Removed; rubbed out", "Tool for removing marks", "Removes; rubs out", "Read again", "Seat again", "Starts over; restores settings", "Relaxed", "Used again", "Uses again", "Oxidized; corroded", "Gazed; looked fixedly", "One who gazes", "Gazes; looks fixedly", "Guides; young bulls", "Most certain", "One who playfully mocks", "Exchanges; business deals", "Walks on; tire patterns", "Most genuine"],
      7: ["Most beloved", "Tools for removing marks", "People who read books", "Reads again", "Seats again", "State again; rephrase", "Guided; drove", "Ones who playfully mock"],
      8: ["Stated again", "States again", "Valuable items; cherish (pangram!)"],
      9: ["Greatly valued; cherished (pangram!)"]
    }
  },
  // PUZZLE 5: CHARADES - "Warning: highly addictive!" (Feb 20)
  {
    id: 'charades-s2',
    subtitle: 'Warning: highly addictive!',
    letters: ['C', 'H', 'A', 'R', 'D', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 87,
    words: {
      4: ['ACHE', 'ACRE', 'AREA', 'CARE', 'CASE', 'DARE', 'DEAR', 'EACH', 'EARS', 'EASE', 'ERAS', 'HARE', 'HEAD', 'HEAR', 'RACE', 'READ', 'SEAR'],
      5: ['ACHED', 'ACHES', 'ACRES', 'ARCED', 'AREAS', 'CARED', 'CARES', 'CASED', 'CASES', 'CEDAR', 'CHASE', 'DARED', 'DARER', 'DARES', 'DEARS', 'EASED', 'ERASE', 'HARES', 'HEADS', 'HEARD', 'HEARS', 'RACED', 'RACER', 'RACES', 'REACH', 'READS', 'SCARE', 'SEARS', 'SHADE', 'SHARE'],
      6: ['ARCHED', 'ARCHES', 'ARCADE', 'CADRES', 'CASHED', 'CEDARS', 'CHASED', 'CHASER', 'CHASES', 'ERASED', 'ERASER', 'ERASES', 'HEADER', 'HEARSE', 'RACERS', 'SACRED', 'SCARED', 'SCARER', 'SCARES', 'SEARCH', 'SEARED', 'SHADED', 'SHADES', 'SHARED', 'SHARER', 'SHARES'],
      7: ['ARCADES', 'CHARADE', 'CHASERS', 'CRASHED', 'CRASHES', 'ERASERS', 'HEADERS', 'HEARSES', 'REACHED', 'REACHES', 'SHARERS'],
      8: ['CHARADES', 'SEARCHED', 'SEARCHES']
    },
    hints: {
      4: ["Pain; hurt", "Unit of land measurement", "Region; surface space", "Be concerned; look after", "Container; instance", "Challenge someone; be bold", "Beloved; expensive", "Every one separately", "Hearing organs", "Comfort; lack of difficulty", "Historical time periods", "Rabbit-like animal", "Top of body; leader", "Perceive sound", "Competition; ethnicity", "Look at written words", "Burn the surface; scorch"],
      5: ["Hurt (past tense)", "Pains; hurts", "Units of land measurement", "Moved in a curve", "Regions; surface spaces", "Was concerned; looked after", "Is concerned; looks after", "Put in a container", "Containers; instances", "Aromatic wood tree", "Pursue; run after", "Challenged (past tense)", "One who dares", "Challenges; acts boldly", "Beloved ones", "Made more comfortable", "Remove; rub out", "Rabbit-like animals", "Tops of bodies; leaders", "Perceived sound", "Perceives sound", "Competed (past tense)", "One who races", "Competitions; ethnicities", "Extend to grab; arrive at", "Looks at written words", "Frighten", "Burns surfaces; scorches", "Shadow; lamp cover", "Divide; portion"],
      6: ["Curved", "Curves; doorway shapes", "Covered shopping area; game venue", "Groups of trained personnel", "Exchanged for money", "Aromatic wood trees", "Pursued; ran after", "One who pursues", "Pursues; runs after", "Removed; rubbed out", "Tool for removing marks", "Removes; rubs out", "Top of document; soccer move", "Funeral vehicle", "Ones who race", "Holy; revered", "Frightened", "One who frightens", "Frightens", "Look for; hunt", "Burned the surface", "Put in shadow", "Shadows; lamp covers", "Divided; portioned", "One who shares", "Divides; portions"],
      7: ["Covered shopping areas", "Acting game; pretense (pangram!)", "Ones who pursue", "Collided violently", "Collides violently", "Tools for removing marks", "Tops of documents", "Funeral vehicles", "Extended to grab", "Extends to grab", "Ones who share"],
      8: ["Acting guessing game (pangram!)", "Looked for; hunted", "Looks for; hunts"]
    }
  },
  // PUZZLE 6: WINTERS - "The coffee's hot!" (Feb 21)
  {
    id: 'winters-s2',
    subtitle: "The coffee's hot!",
    letters: ['W', 'I', 'N', 'T', 'E', 'R', 'S'],
    keyLetters: ['E', 'R'],
    totalWordCount: 73,
    words: {
      4: ['EWER', 'IRES', 'REIN', 'RENT', 'REST', 'RITE', 'RISE', 'SEER', 'SIRE', 'TERN', 'TIER', 'TIRE', 'TREE', 'WERE', 'WIRE', 'WREN'],
      5: ['ENTER', 'EWERS', 'INERT', 'INTER', 'NEWER', 'REINS', 'RENTS', 'RESIT', 'RINSE', 'RISEN', 'RISER', 'RITES', 'SEERS', 'SIREN', 'SIRES', 'SNEER', 'STEER', 'STERN', 'TERNS', 'TERSE', 'TIERS', 'TIRES', 'TREES', 'TRIER', 'WIRES', 'WISER', 'WRENS', 'WREST', 'WRIER', 'WRITE'],
      6: ['ENTERS', 'INSERT', 'INTERS', 'RENEWS', 'RESENT', 'RINSER', 'RINSES', 'RISERS', 'SIRENS', 'SISTER', 'SNEERS', 'STEERS', 'STERNS', 'TENSER', 'TRIERS', 'TWINER', 'WINTER', 'WRIEST', 'WRITER', 'WRITES'],
      7: ['ENTRIES', 'INSERTS', 'RESENTS', 'SISTERS', 'TWINERS', 'WINTERS', 'WRITERS']
    },
    hints: {
      4: ["Water pitcher", "Angers or annoys", "Strap to control a horse", "Lease payment; or tear", "Relax; remainder", "Ceremony or ritual", "Go upward; get out of bed", "Prophet; one who foresees", "Father; address to a king", "Seabird", "Level or layer", "Rubber wheel covering; grow weary", "Woody plant with branches", "Past tense of 'to be'", "Metal conductor; telegram", "Small songbird"],
      5: ["Go in; type into a computer", "Water pitchers", "Inactive; not moving", "Bury; place in a grave", "More recent", "Straps to control a horse", "Lease payments; tears", "Take an exam again", "Wash lightly", "Got up; came upward", "Early bird; stair part", "Ceremonies or rituals", "Prophets; fortune tellers", "Warning sound; mythical singer", "Fathers; addresses to kings", "Scornful smile; mock", "Guide; young bull", "Back of ship; serious", "Seabirds", "Brief and to the point", "Levels or layers", "Rubber wheel coverings", "Woody plants", "One who attempts", "Metal conductors; telegrams", "More wise", "Small songbirds", "Pull away forcibly", "More wry; more twisted", "Put words on paper"],
      6: ["Goes in; types into computer", "Put in; place inside", "Buries; places in graves", "Makes new again", "Feel bitter about", "One who rinses", "Washes lightly", "Early birds; stair parts", "Warning sounds; mythical singers", "Female sibling", "Scornful smiles; mocks", "Guides; young bulls", "Backs of ships", "More tight; more strained", "Ones who attempt", "One who twines", "Cold season (pangram!)", "Most wry; most twisted", "Author; one who writes", "Puts words on paper"],
      7: ["Ways in; items in a list", "Puts in; places inside", "Feels bitter about", "Female siblings", "Ones who twine", "Cold seasons (pangram!)", "Authors; ones who write"]
    }
  },
  // PUZZLE 7: SALTIER - "Flex those word muscles!" (Feb 22)
  {
    id: 'saltier-s2',
    subtitle: 'Flex those word muscles!',
    letters: ['S', 'A', 'L', 'T', 'I', 'E', 'R'],
    keyLetters: ['A', 'E'],
    totalWordCount: 91,
    words: {
      4: ['ALES', 'AREA', 'EARL', 'EARS', 'EASE', 'EAST', 'EATS', 'ERAS', 'LATE', 'LEAS', 'RATE', 'REAL', 'SALE', 'SATE', 'SEAL', 'SEAR', 'SEAT', 'TALE', 'TARE', 'TEAL', 'TEAR', 'TEAS'],
      5: ['AISLE', 'ALERT', 'ALTER', 'AREAS', 'ARISE', 'ASTER', 'EARLS', 'EASEL', 'EATER', 'ELATE', 'IRATE', 'LASER', 'LATER', 'LEAST', 'RAISE', 'RATES', 'REALS', 'SALES', 'SATES', 'SEALS', 'SEARS', 'SEATS', 'SLATE', 'STALE', 'STARE', 'STEAL', 'TALES', 'TARES', 'TEALS', 'TEARS', 'TEASE', 'TESLA'],
      6: ['ALERTS', 'ALTERS', 'AISLES', 'ARISES', 'ASTERS', 'EASELS', 'EATERS', 'ELATES', 'LASERS', 'RAISER', 'RAISES', 'RELATE', 'RETAIL', 'SAILER', 'SALTER', 'SATIRE', 'SEALER', 'SLATER', 'STALER', 'TEASER'],
      7: ['RAISERS', 'REALIST', 'RELATES', 'RETAILS', 'SAILERS', 'SALTIER', 'SALTERS', 'SATIRES', 'SEALERS', 'SLATERS', 'STEALER', 'TEASERS', 'TRAILER'],
      8: ['REALISTS', 'SALTIERS', 'STEALERS', 'TRAILERS']
    },
    hints: {
      4: ["Types of beer", "Region; surface space", "British nobleman", "Hearing organs", "Comfort; lack of difficulty", "Compass direction; sunrise side", "Consumes food", "Historical time periods", "Not on time; deceased", "Meadows; grasslands", "Speed; evaluate or rank", "Genuine; actual", "Discount event at a store", "Satisfy fully", "Ocean mammal; close tightly", "Burn the surface; scorch", "Chair; place to sit", "Story; narrative", "Weed; weight of container", "Blue-green color; duck", "Rip; eye drop", "Hot brewed beverages"],
      5: ["Walkway between seats", "Warning; alarm", "Change; modify", "Regions; surface spaces", "Get up; originate", "Star-shaped flower", "British noblemen", "Art stand for painting", "One who consumes food", "Make happy; thrill", "Angry; furious", "Light beam device", "After; more recent", "Smallest amount", "Lift up; increase", "Speeds; evaluates", "Genuine ones; actual", "Discount events", "Satisfies fully", "Ocean mammals; closes", "Burns surfaces; scorches", "Chairs; places to sit", "Rock; schedule", "Not fresh; old bread", "Gaze; look fixedly", "Take without permission", "Stories; narratives", "Weeds; container weights", "Blue-green colors; ducks", "Rips; eye drops", "Playfully mock", "Electric car brand; unit"],
      6: ["Warnings; alarms", "Changes; modifies", "Walkways between seats", "Gets up; originates", "Star-shaped flowers", "Art stands for painting", "Ones who consume food", "Makes happy; thrills", "Light beam devices", "One who raises", "Lifts up; increases", "Connect; tell about", "Sell directly to consumers", "Boat that sails", "One who adds salt", "Mocking humor; irony", "One who seals", "One who lays slate", "More stale; less fresh", "One who playfully mocks"],
      7: ["Ones who raise", "Practical person", "Connects; tells about", "Sells directly to consumers", "Boats that sail", "More salty (pangram!)", "Ones who add salt", "Mocking humor works", "Ones who seal", "Ones who lay slate", "One who steals", "Ones who playfully mock", "Vehicle towed behind"],
      8: ["Practical people", "More salty ones (pangram!)", "Ones who steal", "Vehicles towed behind"]
    }
  },
  // PUZZLE 8: REASONED - "Think things through" (Feb 23)
  {
    id: 'reasoned-s2',
    subtitle: 'Think things through',
    letters: ['R', 'E', 'A', 'S', 'O', 'N', 'D'],
    keyLetters: ['A', 'E'],
    totalWordCount: 54,
    words: {
      4: ['AEON', 'AREA', 'DARE', 'DEAN', 'DEAR', 'EARN', 'EARS', 'EASE', 'ERAS', 'NEAR', 'READ', 'SANE', 'SEAR', 'SERA'],
      5: ['AEONS', 'ANODE', 'AREAS', 'AROSE', 'DARES', 'DEANS', 'DEARS', 'EARNS', 'EASED', 'ERASE', 'NEARS', 'OARED', 'READS', 'SANER', 'SEARS', 'SNARE'],
      6: ['ANODES', 'EARNED', 'EARNER', 'ERASED', 'ERASER', 'ERASES', 'REASON', 'SANDER', 'SNARED', 'SNARER', 'SNARES', 'SOARED', 'SOARER'],
      7: ['EARNERS', 'ERASERS', 'ENDEARS', 'REASONS', 'SANDERS', 'SNARERS', 'SOARERS'],
      8: ['REASONED', 'REASONER', 'SEASONED'],
      9: ['REASONERS']
    },
    hints: {
      4: ["Long period of time; age", "Region; surface space", "Challenge someone; be bold", "University official; church leader", "Beloved; expensive", "Make money; deserve", "Hearing organs", "Comfort; lack of difficulty", "Historical time periods", "Close by; almost", "Look at written words", "Mentally healthy; rational", "Burn the surface; scorch", "Blood fluid (plural)"],
      5: ["Long periods of time; ages", "Electrode; battery terminal", "Regions; surface spaces", "Got up; came into being", "Challenges; acts boldly", "University officials", "Beloved ones", "Makes money; deserves", "Made more comfortable", "Remove; rub out", "Close by ones; almosts", "Having oars", "Looks at written words", "More mentally healthy", "Burns surfaces; scorches", "Trap; entangle"],
      6: ["Electrodes; battery terminals", "Made money; deserved", "One who earns money", "Removed; rubbed out", "Tool for removing marks", "Removes; rubs out", "Logic; explanation", "Tool for smoothing wood", "Trapped; entangled", "One who traps", "Traps; entangles", "Flew high; glided", "One who soars"],
      7: ["Ones who earn money", "Tools for removing marks", "Makes dear; makes beloved", "Logics; explanations", "Tools for smoothing wood", "Ones who trap", "Ones who soar"],
      8: ["Thought logically (pangram!)", "One who reasons", "Added spices to; experienced"],
      9: ["Ones who think logically"]
    }
  },
  // PUZZLE 1: STICKER
  {
    id: 'sticker-puzzle',
    subtitle: 'Stir the letters!',
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
    subtitle: 'Good morning, friend!',
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
    subtitle: 'Think outside the cup!',
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
    subtitle: 'Served with a smile!',
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
    subtitle: 'Decaf not allowed here!',
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
    subtitle: 'Every letter counts!',
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
    subtitle: 'A fresh cup of challenge!',
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
    subtitle: 'Side effects include big vocabulary!',
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
    subtitle: 'The regulars saved you a seat!',
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
    subtitle: 'Sharpen your pencil!',
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
    subtitle: 'Words on the menu today!',
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
    subtitle: "Today's special: big words!",
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
    subtitle: 'Your table is ready!',
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
    subtitle: "Don't let the letters intimidate you!",
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
    subtitle: 'Order up!',
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
    subtitle: 'Fresh batch, just for you!',
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
    subtitle: 'The cafe is open!',
    letters: ['S', 'P', 'A', 'R', 'K', 'L', 'E'],
    keyLetters: ['A', 'E'],
    totalWordCount: 88,
    words: {
      4: ['APES', 'AREA', 'EARL', 'EARS', 'EASE', 'ERAS', 'KALE', 'LAKE', 'LEAK', 'LEAP', 'PALE', 'PARE', 'PEAK', 'PEAL', 'PEAR', 'PEAS', 'RAKE', 'RARE', 'REAL', 'REAP', 'SAKE', 'SALE', 'SEAL', 'SEAR'],
      5: ['APERS', 'AREAS', 'EARLS', 'EASEL', 'ERASE', 'KALES', 'LAKES', 'LAPSE', 'LASER', 'LEAKS', 'LEAPS', 'LEASE', 'PALER', 'PALES', 'PAPER', 'PARES', 'PARSE', 'PEAKS', 'PEALS', 'PEARL', 'PEARS', 'PLEAS', 'RAKES', 'REALS', 'REAPS', 'SALES', 'SEALS', 'SEARS', 'SPARE', 'SPEAK', 'SPEAR'],
      6: ['ASLEEP', 'EASELS', 'ERASER', 'ERASES', 'LAPELS', 'LAPSES', 'LASERS', 'LEAPER', 'LEASES', 'PAPERS', 'PARSES', 'PEARLS', 'PLEASE', 'RESALE', 'SEALER', 'SPARES', 'SPEAKS', 'SPEARS'],
      7: ['ERASERS', 'LEAPERS', 'PLEASER', 'RELAPSE', 'REPEALS', 'RESALES', 'SEALERS', 'SPARKLE', 'SPEAKER'],
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
    subtitle: 'Savor every word!',
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
    subtitle: "You're among friends here!",
    letters: ['S', 'C', 'R', 'A', 'B', 'L', 'E'],
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
    subtitle: 'See you tomorrow!',
    letters: ['L', 'I', 'B', 'R', 'A', 'E', 'S'],
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
  },
  
  // =============================================================================
// NEW PUZZLES - Append these to the end of the PUZZLES array
// Each puzzle: 20-31 words, same format as existing puzzles
// =============================================================================

  // PUZZLE 21: SEMINAR
  {
    id: 'seminar-puzzle',
    subtitle: 'Pull up a stool!',
    letters: ['S', 'E', 'M', 'I', 'N', 'A', 'R'],
    keyLetters: ['A', 'E'],
    totalWordCount: 31,
    words: {
      4: ['AMEN', 'AREA', 'EARN', 'EARS', 'ERAS', 'MANE', 'MARE', 'MEAN', 'NAME', 'NEAR', 'SANE', 'SEAM', 'SEAR'],
      5: ['AMINE', 'EARNS', 'MANES', 'MARES', 'MEANS', 'NAMES', 'NEARS', 'SANER'],
      6: ['AIRMEN', 'ANEMIA', 'INSANE', 'MARINE', 'REMAIN'],
      7: ['ANEMIAS', 'MARINES', 'REMAINS', 'SEMINAR'],
      8: ['SEMINARS']
    },
    hints: {
      4: [
        "So be it; said at the end of a prayer",
        "Region; surface space",
        "Make money; deserve",
        "Hearing organs",
        "Historical time periods",
        "Lion's flowing neck hair",
        "Female horse",
        "Unkind; or an average",
        "What you're called",
        "Close by; not far",
        "Mentally healthy; rational",
        "Line where two fabrics are joined",
        "Burn the surface; scorch"
      ],
      5: [
        "Organic compound containing nitrogen",
        "Makes money; deserves",
        "Lions' flowing neck hair",
        "Female horses",
        "Methods; averages",
        "What people are called",
        "Comes close to",
        "More mentally sound"
      ],
      6: [
        "Male members of a military flight crew",
        "Iron-deficiency condition",
        "Not rational; wild",
        "Soldier of the sea",
        "Stay behind; continue to be"
      ],
      7: [
        "Iron-deficiency conditions",
        "Soldiers of the sea",
        "Stays behind; continues to be",
        "Academic lecture or workshop (pangram!)"
      ],
      8: [
        "Academic lectures or workshops (pangram!)"
      ]
    }
  },

  // PUZZLE 22: CURTAIN
  {
    id: 'curtain-puzzle',
    subtitle: 'The show is about to start!',
    letters: ['C', 'U', 'R', 'T', 'A', 'I', 'N'],
    keyLetters: ['A', 'N'],
    totalWordCount: 19,
    words: {
      4: ['ANTI', 'AUNT', 'CANT', 'RAIN', 'RANI', 'RANT', 'TARN', 'TUNA'],
      5: ['ANTIC', 'CAIRN', 'INTRA', 'TAINT', 'TAUNT', 'TRAIN'],
      6: ['NUTRIA', 'RATTAN', 'URANIC'],
      7: ['CANTINA', 'CURTAIN'],
    },
    hints: {
      4: [
        "Against; opposed to",
        "Parent's sister",
        "Cannot (contraction); tilt to one side",
        "Water falling from the sky",
        "Queen or princess in India",
        "Angry outburst",
        "Mountain lake",
        "Sandwich fish; swimmer"
      ],
      5: [
        "Playful or silly behavior",
        "Stack of stones",
        "Within; internally (prefix)",
        "To spoil or corrupt",
        "Challenge; provoke",
        "Locomotive and its cars"
      ],
      6: [
        "Large South American rodent; wetland creature; nu____",
        "Wicker or cane material for chairs",
        "Relating to the planet Uranus"
      ],
      7: [
        "Mexican bar or canteen",
        "Window drape; theater drop (pangram!)"
      ]
    }
  },

  // PUZZLE 23: CARAMELS
  {
    id: 'caramels-puzzle',
    subtitle: 'Sweet words ahead!',
    letters: ['C', 'A', 'R', 'M', 'E', 'L', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 31,
    words: {
      4: ['CARE', 'LACE', 'MARE', 'MEAL', 'RACE', 'REAL', 'REAM', 'SEAL', 'SEAR'],
      5: ['CARES', 'CLEAR', 'CREAM', 'EARLS', 'LACES', 'LAMER', 'MARES', 'MEALS', 'RACES', 'REALM', 'REALS', 'REAMS', 'SCALE', 'SMEAR'],
      6: ['CAMELS', 'CLEARS', 'CREAMS', 'REALMS', 'SCREAM', 'SMEARS'],
      7: ['CARAMEL'],
      8: ['CARAMELS']
    },
    hints: {
      4: [
        "Be concerned; look after",
        "Delicate fabric; shoe tie",
        "Female horse",
        "Food eaten at breakfast, lunch, or dinner",
        "Competition; run fast",
        "Genuine; actual",
        "Large quantity of paper",
        "Ocean mammal; close tightly",
        "Burn the surface; scorch"
      ],
      5: [
        "Is concerned; looks after",
        "Transparent; easy to understand",
        "Dairy topping; rise to the top",
        "British noblemen",
        "Delicate fabrics; shoe ties",
        "Less impressive; more mediocre",
        "Female horses",
        "Foods eaten at mealtimes",
        "Competitions; runs fast",
        "Kingdom; domain",
        "Genuine things; currency",
        "Large quantities of paper",
        "Weighing device; climb up",
        "Smudge; spread grease on"
      ],
      6: [
        "Desert animals with humps",
        "Makes transparent; removes obstacles",
        "Dairy toppings; rises to the top",
        "Kingdoms; domains",
        "Loud cry",
        "Smudges; spreads grease on"
      ],
      7: [
        "Chewy golden-brown candy"
      ],
      8: [
        "Chewy golden-brown candies (pangram!)"
      ]
    }
  },

  // PUZZLE 24: CHARGERS
  {
    id: 'chargers-puzzle',
    subtitle: 'Full speed ahead!',
    letters: ['C', 'H', 'A', 'R', 'G', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 33,
    words: {
      4: ['ACHE', 'ACRE', 'CARE', 'EACH', 'GEAR', 'HARE', 'HEAR', 'RACE', 'SEAR'],
      5: ['ACHES', 'ACRES', 'CARES', 'CHASE', 'GEARS', 'GRACE', 'HARES', 'HEARS', 'RACES', 'REACH', 'SCARE', 'SHARE', 'SHEAR'],
      6: ['ARCHES', 'CHARGE', 'CHASER', 'GRACES', 'SCARES', 'SEARCH', 'SHARES'],
      7: ['CHARGER', 'CRASHES', 'REACHES'],
      8: ['CHARGERS']
    },
    hints: {
      4: [
        "Pain; hurt",
        "Unit of land measurement",
        "Be concerned; look after",
        "Every one individually",
        "Mechanical cog; equipment",
        "Rabbit-like animal",
        "Perceive sound",
        "Competition; run fast",
        "Burn the surface; scorch"
      ],
      5: [
        "Pains; hurts",
        "Units of land measurement",
        "Is concerned; looks after",
        "Pursue; run after",
        "Mechanical cogs; equipment",
        "Elegance; divine favor",
        "Rabbit-like animals",
        "Perceives sound",
        "Competitions; runs fast",
        "Extend to grab; arrive at",
        "Frighten; startle",
        "Divide; portion out",
        "Cut with shears"
      ],
      6: [
        "Curved doorway shapes",
        "Fee; rush at; power up a battery",
        "One who pursues",
        "Elegance and divine favors",
        "Frightens; startles",
        "Look for; hunt",
        "Divides; portions out"
      ],
      7: [
        "Device that powers up a battery",
        "Collides violently",
        "Extends to grab; arrives at"
      ],
      8: [
        "Devices that power up batteries (pangram!)"
      ]
    }
  },

  // PUZZLE 25: PLAYERS
  {
    id: 'players-puzzle',
    subtitle: 'Game on!',
    letters: ['P', 'L', 'A', 'Y', 'E', 'R', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 35,
    words: {
      4: ['EARL', 'ERAS', 'LEAP', 'LEAS', 'PALE', 'PEAR', 'PLEA', 'REAL', 'REAP', 'SALE', 'SEAL'],
      5: ['EARLS', 'LAYER', 'LEAPS', 'PALES', 'PEARL', 'PEARS', 'PLEAS', 'REALS', 'RELAY', 'REPAY', 'SALES', 'SEALS', 'SPARE', 'SPEAR'],
      6: ['LAYERS', 'PEARLS', 'PLAYER', 'RELAYS', 'REPAYS', 'REPLAY', 'SLAYER'],
      7: ['PLAYERS', 'REPLAYS', 'SLAYERS']
    },
    hints: {
      4: [
        "British nobleman",
        "Historical time periods",
        "Jump; spring forward",
        "Meadows; grasslands",
        "Light in color; fence stake",
        "Fruit related to apples",
        "Urgent request; legal argument",
        "Genuine; actual",
        "Harvest; gather crops",
        "Discount event at a store",
        "Ocean mammal; close tightly"
      ],
      5: [
        "British noblemen",
        "Coating; level or stratum",
        "Jumps; springs forward",
        "Light colors; fence stakes",
        "Gem from an oyster",
        "Fruits related to apples",
        "Urgent requests; legal arguments",
        "Genuine things; currency",
        "Pass the baton; race team tactic",
        "Pay back; return a favor",
        "Discount events at stores",
        "Ocean mammals; closes tightly",
        "Extra; not tight",
        "Weapon; throw a javelin"
      ],
      6: [
        "Coatings; levels or strata",
        "Gems from oysters",
        "Someone in a game or performance",
        "Passes the baton; race tactics",
        "Pays back; returns favors",
        "Watch again; do over",
        "One who slays"
      ],
      7: [
        "People in a game or performance (pangram!)",
        "Watches again; does over",
        "Ones who slay"
      ]
    }
  },

    // PUZZLE 34: TOPPINGS
  {
    id: 'toppings-puzzle',
    subtitle: 'Load it up!',
    letters: ['T', 'O', 'P', 'I', 'N', 'G', 'S'],
    keyLetters: ['O', 'I'],
    totalWordCount: 20,
    words: {
      4: ['INTO', 'IONS', 'PION'],
      5: ['PINTO', 'PITON', 'POINT', 'POSIT'],
      6: ['OPTING', 'OPTION', 'PINTOS', 'PISTON', 'PITONS', 'POINTS', 'POTION'],
      7: ['OPTIONS', 'PISTONS', 'POSTING', 'POTIONS', 'TOPPING'],
      8: ['TOPPINGS']
    },
    hints: {
      4: [
        "Inside; to go within",
        "Charged particles; electrolytes",
        "Elementary particle; subatomic unit"
      ],
      5: [
        "Spotted horse; small wild horse",
        "Stake driven into the ground",
        "Score or tally; sharp tip",
        "Assume; put forward a hypothesis"
      ],
      6: [
        "Choosing; deciding to do something",
        "Choice; something you can pick",
        "Spotted horses; small wild horses",
        "Engine part that moves up and down",
        "Stakes driven into the ground",
        "Scores or tallies; sharp tips",
        "Magic drink; medicinal liquid"
      ],
      7: [
        "Choices; things you can pick",
        "Engine parts that move up and down",
        "Placing mail; putting something up",
        "Magic drinks; medicinal liquids",
        "Layer on a pizza or ice cream (pangram!)"
      ],
      8: [
        "Layers on a pizza or ice cream (pangram!)"
      ]
    }
  },

  // PUZZLE 35: CARTOONS
  {
    id: 'cartoons-puzzle',
    subtitle: 'Saturday morning vibes!',
    letters: ['C', 'A', 'R', 'T', 'O', 'N', 'S'],
    keyLetters: ['A', 'O'],
    totalWordCount: 32,
    words: {
      4: ['COAT', 'ORCA', 'ROAN', 'TACO'],
      5: ['ACORN', 'ACTOR', 'CANON', 'CANTO', 'COAST', 'COATS', 'ORCAS', 'ROANS', 'SONAR', 'TACOS'],
      6: ['ACORNS', 'ACTORS', 'CANONS', 'CANTON', 'CANTOR', 'CANTOS', 'CARTON', 'CONTRA', 'CORONA', 'COSTAR'],
      7: ['CANTONS', 'CANTORS', 'CARTONS', 'CARTOON', 'CONTRAS', 'CORONAS', 'COSTARS'],
      8: ['CARTOONS']
    },
    hints: {
      4: [
        "Jacket; to cover with a layer",
        "Large ocean-dwelling dolphin relative",
        "Reddish-brown horse color",
        "Mexican food in a shell"
      ],
      5: [
        "Nut that squirrels love",
        "Performer on stage or screen",
        "Church law; a rule or standard",
        "Section of a poem or song",
        "Shoreline; to glide without effort",
        "Jackets; layers of paint",
        "Large ocean-dwelling dolphin relatives",
        "Reddish-brown horses",
        "Sound detection device; echo locator",
        "Mexican foods in shells"
      ],
      6: [
        "Nuts that squirrels love",
        "Performers on stage or screen",
        "Church laws; rules or standards",
        "District or division of a country",
        "Choir director; one who sings lead",
        "Sections of poems or songs",
        "Cardboard box for shipping",
        "Against; opposing force",
        "Crown; halo of light around the sun",
        "Co-star of a film or show"
      ],
      7: [
        "Districts or divisions of a country",
        "Choir directors; ones who sing lead",
        "Cardboard boxes for shipping",
        "Animated drawing; funny drawing (pangram!)",
        "Opposing forces",
        "Crowns; halos around the sun",
        "Co-stars of films or shows"
      ],
      8: [
        "Animated drawings; funny drawings (pangram!)"
      ]
    }
  },

  // PUZZLE 36: PADDLING
  {
    id: 'paddling-puzzle',
    subtitle: 'Making a splash!',
    letters: ['P', 'A', 'D', 'L', 'I', 'N', 'G'],
    keyLetters: ['A', 'I'],
    totalWordCount: 23,
    words: {
      4: ['DIAL', 'GAIN', 'LAIN', 'NAIL', 'PAID', 'PAIL', 'PAIN'],
      5: ['ALIGN', 'LAPIN', 'NAIAD', 'PLAID', 'PLAIN'],
      6: ['AIDING', 'AILING', 'INLAID', 'INLAND', 'LADING', 'PALING'],
      7: ['DIALING', 'LANDING', 'NAILING', 'PADDING'],
      8: ['PADDLING']
    },
    hints: {
      4: [
        "Rotate; face of a clock",
        "Profit; to acquire",
        "Resting; stretched out flat",
        "Metal fastener; hammer it in",
        "Received money for work",
        "Bucket with a handle",
        "Ache; suffering"
      ],
      5: [
        "Line up; arrange in a row",
        "Young rabbit",
        "Water nymph in Greek mythology",
        "Tartan pattern; Scottish fabric",
        "Simple; obvious; flat landscape"
      ],
      6: [
        "Helping; assisting someone",
        "Feeling unwell; sick",
        "Set into a surrounding surface",
        "Not on the coast; away from the sea",
        "Loading cargo; adding weight",
        "Growing paler; fence posts"
      ],
      7: [
        "Calling a phone number",
        "Coming ashore; touching down",
        "Hammering nails; securing with nails",
        "Extra cushioning; filling out"
      ],
      8: [
        "Moving a canoe with a paddle (pangram!)"
      ]
    }
  },

  // PUZZLE 37: HYDRATE
  {
    id: 'hydrate-puzzle',
    subtitle: 'Drink up!',
    letters: ['H', 'Y', 'D', 'R', 'A', 'T', 'E'],
    keyLetters: ['A', 'E'],
    totalWordCount: 30,
    words: {
      4: ['DARE', 'DATE', 'DEAR', 'HARE', 'HATE', 'RATE', 'READ', 'TARE', 'YEAR'],
      5: ['DARED', 'DATED', 'DATER', 'DEATH', 'EARTH', 'HATED', 'HATER', 'HEARD', 'HEART', 'RATED', 'READY', 'TEARY', 'TRADE', 'TREAD'],
      6: ['DEARTH', 'EARTHY', 'RATHER', 'THREAD', 'TRADER'],
      7: ['HYDRATE', 'THREADY'],
    },
    hints: {
      4: [
        "Challenge someone; be bold",
        "Calendar day; romantic outing",
        "Beloved; expensive",
        "Rabbit-like animal",
        "Strong dislike; despise",
        "Speed; evaluate or rank",
        "Look at written words",
        "Weed; weight of a container",
        "365 days; what you celebrate on your birthday"
      ],
      5: [
        "Challenged; was bold",
        "Had a romantic outing; set a time",
        "One who sets a time or goes on dates",
        "End of life; dying",
        "Soil and rock beneath our feet; the planet",
        "Strongly disliked; despised",
        "One who strongly dislikes",
        "Perceived with the ears; listened to",
        "Organ that pumps blood; center of emotion",
        "Evaluated; had a certain speed",
        "Prepared; set to go",
        "Full of tears; about to cry",
        "Exchange; business deal",
        "Walk heavily; tire pattern"
      ],
      6: [
        "Scarcity; severe lack of something",
        "Rough and natural; of the earth",
        "More so; to a greater degree",
        "Thin cord; follow the story",
        "One who buys and sells goods"
      ],
      7: [
        "Add water; keep the body moist (pangram!)",
        "Resembling a loose thread; fraying"
      ]
    }
  },

  // PUZZLE 38: MUNCHIES
  {
    id: 'munchies-puzzle',
    subtitle: 'Snack time!',
    letters: ['M', 'U', 'N', 'C', 'H', 'I', 'E', 'S'],
    keyLetters: ['I', 'E'],
    totalWordCount: 29,
    words: {
      4: ['HEMI', 'HIES', 'MICE', 'MIEN', 'MINE', 'NICE', 'SEMI'],
      5: ['CHIME', 'MIENS', 'MINCE', 'MINES', 'NICHE', 'NIECE', 'SHINE', 'SINCE'],
      6: ['CHIMES', 'ICEMEN', 'IMMUNE', 'INCHES', 'MINCES', 'NICHES', 'NIECES', 'SHINES'],
      7: ['CHEMISE', 'CUISINE', 'MUNCHIE'],
      8: ['CHEMISES', 'CUISINES', 'MUNCHIES']
    },
    hints: {
      4: [
        "Half; prefix meaning partially",
        "Hurries; rushes off",
        "Small rodents; plural of mouse",
        "Air or manner; outward appearance",
        "Tunnel dug for minerals; it's all mine!",
        "Pleasant; kind",
        "Partial; halfway point"
      ],
      5: [
        "Bell sound; to ring like a bell",
        "Airs or manners; outward appearances",
        "Chop finely; walk daintily",
        "Tunnels dug for minerals",
        "Specialty area; snug little spot",
        "Sister's daughter or brother's daughter",
        "Glow brightly; polish to a sheen",
        "From the time that; because"
      ],
      6: [
        "Bell sounds; rings like bells",
        "Men made of ice; hockey players informally",
        "Protected from disease; not affected by",
        "Units of measurement; small amounts",
        "Chops finely; walks daintily",
        "Specialty areas; snug little spots",
        "Sisters' or brothers' daughters",
        "Glows brightly; polishes to a sheen"
      ],
      7: [
        "Light undergarment; sleeveless dress",
        "Style of cooking; food of a region",
        "Small snack; late-night craving"
      ],
      8: [
        "Light undergarments; sleeveless dresses",
        "Styles of cooking; foods of a region",
        "Late-night snack cravings (pangram!)"
      ]
    }
  },

    // PUZZLE 39: CAPITOL
  {
    id: 'capitol-puzzle',
    subtitle: 'Make your voice heard!',
    letters: ['C', 'A', 'P', 'I', 'T', 'O', 'L'],
    keyLetters: ['A', 'O'],
    totalWordCount: 18,
    words: {
      4: ['ALTO', 'ATOP', 'COAL', 'COAT', 'COLA', 'IOTA', 'TACO'],
      5: ['ATOLL', 'COATI', 'COPAL', 'OCTAL', 'PATIO', 'TOTAL'],
      7: ['CAPITOL', 'OPTICAL', 'TAPIOCA', 'TOPCOAT', 'TOPICAL']
    },
    hints: {
      4: [
        "High singing voice; musical range",
        "On top of; above",
        "Black fuel burned for heat",
        "Jacket; layer of paint",
        "Soft drink; ingredient in rum drinks",
        "Tiny amount; Greek letter",
        "Mexican food in a crunchy shell"
      ],
      5: [
        "Ring-shaped coral island",
        "Raccoon-like animal from South America",
        "Aromatic tree resin used in varnish",
        "Base eight; relating to the number eight",
        "Outdoor courtyard or terrace",
        "Sum of everything; complete amount"
      ],
      7: [
        "Building where lawmakers meet (pangram!)",
        "Relating to lenses and light",
        "Starchy pudding ingredient; tropical plant",
        "Weatherproof outer coat",
        "Relating to a subject or current events"
      ]
    }
  },

  // PUZZLE 40: EARRINGS
  {
    id: 'earrings-puzzle',
    subtitle: 'Looking fabulous!',
    letters: ['E', 'A', 'R', 'I', 'N', 'G', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 41,
    words: {
      4: ['AREA', 'EARN', 'EARS', 'ERAS', 'GEAR', 'NEAR', 'SANE'],
      5: ['ANISE', 'AREAS', 'ARISE', 'EARNS', 'GEARS', 'INANE', 'NEARS', 'RAISE', 'RANGE', 'SANER', 'SNARE'],
      6: ['ARISES', 'GAINER', 'GARNER', 'INSANE', 'RAISER', 'RAISES', 'RANGER', 'RANGES', 'REGAIN', 'SNARES'],
      7: ['ARRANGE', 'EARRING', 'ERASING', 'GAINERS', 'GARNERS', 'NEARING', 'RAISERS', 'RANGERS', 'REARING', 'REGAINS', 'SEARING'],
      8: ['ARRANGES', 'EARRINGS']
    },
    hints: {
      4: [
        "Region; surface space",
        "Make money; deserve",
        "Hearing organs",
        "Historical time periods",
        "Mechanical cog; equipment",
        "Close by; not far",
        "Mentally sound; rational"
      ],
      5: [
        "Herb used in cooking; licorice-flavored seeds",
        "Regions; surface spaces",
        "Get up; come into being",
        "Makes money; deserves",
        "Mechanical cogs; equipment",
        "Silly and pointless; lacking sense",
        "Comes close to",
        "Lift up; increase",
        "Span of distance; mountain chain",
        "More mentally sound",
        "Trap for catching animals"
      ],
      6: [
        "Gets up; comes into being",
        "One who profits or acquires",
        "Collect and store; gather rewards",
        "Not rational; wild or chaotic",
        "One who lifts or increases",
        "Lifts up; increases",
        "Park protector; forest guide",
        "Spans; mountain chains",
        "Get back; recover",
        "Traps; catches in a snare"
      ],
      7: [
        "Put in order; organize neatly",
        "Jewelry worn on the ear (pangram!)",
        "Removing by rubbing out",
        "Ones who profit or acquire",
        "Collects and stores; gathers",
        "Getting close to",
        "Ones who lift or increase",
        "Park protectors; forest guides",
        "Raising up from behind; bringing up children",
        "Gets back; recovers",
        "Burning; extremely hot"
      ],
      8: [
        "Puts in order; organizes neatly",
        "Jewelry worn on the ears (pangram!)"
      ]
    }
  },

  // PUZZLE 41: CARHOPS
  {
    id: 'carhops-puzzle',
    subtitle: 'Your order is ready!',
    letters: ['C', 'A', 'R', 'H', 'O', 'P', 'S'],
    keyLetters: ['A', 'R'],
    totalWordCount: 32,
    words: {
      4: ['ARCH', 'ARCS', 'CARP', 'CHAR', 'HARP', 'HOAR', 'HORA', 'ORCA', 'PROA', 'RASH', 'SCAR', 'SOAR'],
      5: ['CARPS', 'CHARS', 'COPRA', 'CRASH', 'HARPS', 'HOARS', 'HORAS', 'ORCAS', 'PARCH', 'SCARP', 'SCARS', 'SCRAP', 'SHARP'],
      6: ['CARHOP', 'COPRAS', 'PHAROS', 'SCARPS', 'SHARPS'],
      7: ['CARHOPS'],
      8: ['APPROACH']
    },
    hints: {
      4: [
        "Curved structure; doorway shape",
        "Curved lines; electrical sparks",
        "Freshwater fish; complain repeatedly",
        "Burn the surface; blacken with heat",
        "Stringed instrument played by plucking",
        "White with age; frost-covered",
        "Traditional circle dance",
        "Large ocean dolphin relative",
        "Outrigger canoe",
        "Reckless; hasty and careless",
        "Mark left by a wound",
        "Glide upward on air currents"
      ],
      5: [
        "Freshwater fish; complains repeatedly",
        "Burns the surface; blackens with heat",
        "Dried coconut meat used in cooking",
        "Violent collision; sudden loud noise",
        "Stringed instruments played by plucking",
        "White with age; frost-covered (plural)",
        "Traditional circle dances",
        "Large ocean dolphin relatives",
        "Dry out; make thirsty",
        "Steep rocky cliff face",
        "Marks left by wounds",
        "Scraps; bits of leftover material",
        "Having a keen edge; quick-witted"
      ],
      6: [
        "Drive-in restaurant server (pangram!)",
        "Dried coconut meat (plural)",
        "Ancient lighthouse; beacon of light",
        "Steep rocky cliff faces",
        "Having keen edges; quick-witted (plural)"
      ],
      7: [
        "Drive-in restaurant servers (pangram!)"
      ],
      8: [
        "Come near; method of doing something"
      ]
    }
  },

    // PUZZLE 42: ASCRIBE
  {
    id: 'ascribe-puzzle',
    subtitle: 'Write it down!',
    letters: ['A', 'S', 'C', 'R', 'I', 'B', 'E'],
    keyLetters: ['A', 'E'],
    totalWordCount: 35,
    words: {
      4: ['ACES', 'ACRE', 'BARE', 'BASE', 'BEAR', 'CARE', 'CASE', 'RACE', 'SEAR'],
      5: ['ACRES', 'ARISE', 'BARES', 'BASER', 'BEARS', 'BRACE', 'CABER', 'CARES', 'CASES', 'RACES', 'RAISE', 'SABER', 'SABRE'],
      6: ['ARISES', 'BRACES', 'CABERS', 'CARIES', 'EASIER', 'RABIES', 'RAISER', 'RAISES', 'SABERS', 'SABRES'],
      7: ['ASCRIBE', 'RAISERS'],
      8: ['ASCRIBES']
    },
    hints: {
      4: [
        "Top cards in a deck; experts",
        "Unit of land measurement",
        "Uncovered; naked",
        "Bottom; foundation",
        "Large furry animal; endure",
        "Be concerned; look after",
        "Container; instance",
        "Competition; run fast",
        "Burn the surface; scorch"
      ],
      5: [
        "Units of land measurement",
        "Get up; come into being",
        "Uncovers; exposes",
        "More vile; lower quality",
        "Large furry animals; endures",
        "Support device; prepare for impact",
        "Heavy wooden pole tossed in Scottish games",
        "Is concerned; looks after",
        "Containers; instances",
        "Competitions; runs fast",
        "Lift up; increase",
        "Curved sword",
        "Curved sword (British spelling)"
      ],
      6: [
        "Gets up; comes into being",
        "Support devices; dental gear",
        "Heavy wooden poles tossed in Scottish games",
        "Tooth decay",
        "Less difficult; more comfortable",
        "Viral disease spread by animal bites",
        "One who lifts or increases",
        "Lifts up; increases",
        "Curved swords",
        "Curved swords (British spelling)"
      ],
      7: [
        "Credit or attribute to someone (pangram!)",
        "Ones who lift or increase"
      ],
      8: [
        "Credits or attributes to someone (pangram!)"
      ]
    }
  },

  // PUZZLE 43: CANOERS
  {
    id: 'canoers-puzzle',
    subtitle: 'Paddle on in!',
    letters: ['C', 'A', 'N', 'O', 'E', 'R', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 45,
    words: {
      4: ['ACNE', 'ACRE', 'AEON', 'CANE', 'CARE', 'CASE', 'EARN', 'EARS', 'ERAS', 'NEAR', 'RACE', 'SANE'],
      5: ['ACNES', 'ACRES', 'AEONS', 'AROSE', 'CANER', 'CANES', 'CANOE', 'CARES', 'CASES', 'CRANE', 'EARNS', 'NEARS', 'OCEAN', 'RACES', 'SANER', 'SNARE'],
      6: ['CANERS', 'CANOER', 'CANOES', 'COARSE', 'CORNEA', 'CRANES', 'OCEANS', 'REASON', 'SEASON', 'SENORA', 'SNARES'],
      7: ['CANOERS', 'COARSEN', 'CORNEAS', 'REASONS', 'SENORAS'],
      8: ['COARSENS']
    },
    hints: {
      4: [
        "Skin condition with pimples",
        "Unit of land measurement",
        "Long period of time; an age",
        "Walking stick; sugar plant",
        "Be concerned; look after",
        "Container; instance",
        "Make money; deserve",
        "Hearing organs",
        "Historical time periods",
        "Close by; not far",
        "Competition; run fast",
        "Mentally sound; rational"
      ],
      5: [
        "Skin conditions with pimples",
        "Units of land measurement",
        "Long periods of time; ages",
        "Got up; came into being",
        "One who makes walking sticks or canes",
        "Walking sticks; sugar plants",
        "Narrow boat paddled with a single oar",
        "Is concerned; looks after",
        "Containers; instances",
        "Large bird with a long neck",
        "Makes money; deserves",
        "Comes close to",
        "Large body of salt water",
        "Competitions; runs fast",
        "More mentally sound",
        "Trap for catching animals"
      ],
      6: [
        "Ones who make walking sticks",
        "One who paddles a narrow boat",
        "Narrow boats paddled with a single oar",
        "Rough; lacking refinement",
        "Transparent part of the eye",
        "Large birds with long necks",
        "Large bodies of salt water",
        "Logic; explanation; think through",
        "Time of year; add flavor to food",
        "Spanish title for a woman; ma'am",
        "Traps for catching animals"
      ],
      7: [
        "People who paddle narrow boats (pangram!)",
        "Make rougher; less refined",
        "Transparent parts of the eye",
        "Logics; explanations",
        "Spanish titles for women"
      ],
      8: [
        "Makes rougher; less refined"
      ]
    }
  },

  // PUZZLE 44: BUDGIES
  {
    id: 'budgies-puzzle',
    subtitle: 'Pretty bird!',
    letters: ['B', 'U', 'D', 'G', 'I', 'E', 'S'],
    keyLetters: ['I', 'E'],
    totalWordCount: 26,
    words: {
      4: ['BIDE', 'DIES', 'GIBE', 'SIDE'],
      5: ['BEIGE', 'BIDES', 'GIBED', 'GIBES', 'GUIDE', 'GUISE', 'SIDES', 'SIEGE'],
      6: ['BEIGES', 'BESIDE', 'BUDGIE', 'GUIDED', 'GUIDES', 'IBISES', 'SIEGES'],
      7: ['BESIDES', 'BESIEGE', 'BUDGIES', 'SUBSIDE'],
      8: ['BESIEGES', 'DISGUISE', 'SUBSIDED']
    },
    hints: {
      4: [
        "Wait; stay in a place",
        "Passes away; stops living",
        "Mock or taunt someone",
        "Edge; one part of an argument"
      ],
      5: [
        "Sandy tan color; pale yellowish brown",
        "Waits; stays in a place",
        "Mocked or taunted",
        "Mocks or taunts",
        "Lead the way; travel companion",
        "False appearance; disguise",
        "Edges; parts of arguments",
        "Military blockade; prolonged attack"
      ],
      6: [
        "Sandy tan colors",
        "Next to; in addition to",
        "Small colorful pet parakeet (pangram!)",
        "Led the way; escorted",
        "Leads the way; travel companions",
        "Sacred birds of ancient Egypt; wading birds",
        "Military blockades; prolonged attacks"
      ],
      7: [
        "In addition to; moreover",
        "Surround and blockade",
        "Small colorful pet parakeets (pangram!)",
        "Gradually fade or settle down"
      ],
      8: [
        "Surrounds and blockades",
        "Costume or disguise; conceal identity",
        "Gradually faded or settled down"
      ]
    }
  },
    // PUZZLE 45: ALPINES
  {
    id: 'alpines-puzzle',
    subtitle: 'High altitude attitude!',
    letters: ['A', 'L', 'P', 'I', 'N', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 45,
    words: {
      4: ['ALES', 'APES', 'LANE', 'LEAN', 'LEAP', 'NAPE', 'NEAP', 'PALE', 'PANE', 'PEAL'],
      5: ['AISLE', 'ALIEN', 'ALINE', 'ANISE', 'LANES', 'LAPSE', 'LEANS', 'LEAPS', 'LIANE', 'NAPES', 'NEAPS', 'PALES', 'PANEL', 'PANES', 'PEALS', 'PENAL', 'PLANE', 'SEPIA'],
      6: ['AISLES', 'ALIENS', 'ALINES', 'ALPINE', 'LAPINE', 'LIANES', 'PANELS', 'PINEAL', 'PLANES', 'SALINE'],
      7: ['ALIASES', 'ALPINES', 'LAPINES', 'PINEALS', 'SALINES', 'SPANIEL'],
      8: ['SPANIELS']
    },
    hints: {
      4: [
        "Types of beer",
        "Primates; imitates someone",
        "Narrow road; bowling path",
        "Thin; tilt to one side",
        "Jump; spring forward",
        "Back of the neck",
        "Low tide; barely adequate",
        "Light in color; fence stake",
        "Sheet of window glass",
        "Ring out like bells"
      ],
      5: [
        "Walkway between seats",
        "Being from another world; foreign",
        "Line up; arrange in a row",
        "Herb with licorice-flavored seeds",
        "Narrow roads; bowling paths",
        "Slip; temporary failure",
        "Tilts to one side",
        "Jumps; springs forward",
        "Tropical climbing plant; vine",
        "Backs of necks",
        "Low tides; barely adequate",
        "Light colors; fence stakes",
        "Flat section of wall; group of judges",
        "Sheets of window glass",
        "Rings out like bells",
        "Subject to punishment; relating to penalties",
        "Flat surface; aircraft",
        "Reddish-brown pigment; cuttlefish ink"
      ],
      6: [
        "Walkways between seats",
        "Beings from another world; foreigners",
        "Lines up; arranges in a row",
        "Relating to high mountain regions (pangram!)",
        "Relating to rabbits",
        "Tropical climbing plants; vines",
        "Flat sections of wall; groups of judges",
        "Relating to the pineal gland in the brain",
        "Flat surfaces; aircraft",
        "Containing salt; saltwater solution"
      ],
      7: [
        "False names used to hide identity",
        "High mountain plants or regions (pangram!)",
        "Things relating to rabbits",
        "Pineal glands in the brain",
        "Saltwater solutions",
        "Long-eared hunting dog breed"
      ],
      8: [
        "Long-eared hunting dog breeds"
      ]
    }
  },

  // PUZZLE 46: CALDRON
  {
    id: 'caldron-puzzle',
    subtitle: 'Something is brewing!',
    letters: ['C', 'A', 'L', 'D', 'R', 'O', 'N'],
    keyLetters: ['A', 'O'],
    totalWordCount: 20,
    words: {
      4: ['COAL', 'COLA', 'DONA', 'LOAD', 'LOAN', 'ORAL', 'ORCA', 'ROAD', 'ROAN'],
      5: ['ACORN', 'ADORN', 'CANON', 'CAROL', 'CORAL', 'NARCO'],
      6: ['CANDOR', 'CLONAL', 'LARDON'],
      7: ['CALDRON', 'CORONAL']
    },
    hints: {
      4: [
        "Black fuel burned for heat",
        "Soft drink; cocktail ingredient",
        "A Spanish noblewoman; a lady",
        "Cargo; fill up with weight",
        "Borrow money from a bank; lend",
        "Spoken; by mouth",
        "Large ocean dolphin relative",
        "Path for vehicles; journey ahead",
        "Reddish-brown horse color"
      ],
      5: [
        "Nut that squirrels love",
        "Decorate; add ornament to",
        "Church rule; a law or standard",
        "Christmas song; a woman's name",
        "Reef-building sea creature; pink color",
        "Drug trafficker; informal law enforcement term"
      ],
      6: [
        "Honesty; openness and frankness",
        "Relating to a genetic clone",
        "Strip of fat used to flavor cooking"
      ],
      7: [
        "Large pot used for boiling (pangram!)",
        "Relating to a crown; the sun's outer atmosphere"
      ]
    }
  },

  // PUZZLE 47: CALMEST
  {
    id: 'calmest-puzzle',
    subtitle: 'Take a deep breath!',
    letters: ['C', 'A', 'L', 'M', 'E', 'S', 'T'],
    keyLetters: ['A', 'E'],
    totalWordCount: 51,
    words: {
      4: ['ACES', 'ACME', 'ALES', 'CAME', 'CASE', 'LACE', 'LAME', 'MACE', 'MALE', 'MEAL', 'MEAT', 'MESA', 'SALE', 'SAME', 'SEAM', 'SEAT', 'TALE', 'TAME', 'TEAL', 'TEAM'],
      5: ['ACMES', 'CAMEL', 'CASTE', 'CLEAT', 'ECLAT', 'LACES', 'LAMES', 'MACES', 'MALES', 'MEALS', 'MEATS', 'METAL', 'SALES', 'SCALE', 'SEAMS', 'SEATS', 'TALES', 'TAMES', 'TEALS', 'TEAMS'],
      6: ['CAMELS', 'CAMLET', 'CASTES', 'CASTLE', 'CLEATS', 'ECLATS', 'METALS', 'SCALES'],
      7: ['CALMEST', 'CAMLETS', 'CASTLES']
    },
    hints: {
      4: [
        "Top cards in a deck; experts",
        "Peak; highest point of achievement",
        "Types of beer",
        "Arrived; showed up",
        "Container; instance",
        "Delicate fabric; shoe tie",
        "Dull; not exciting; hobble",
        "Heavy club; spice used in cooking",
        "Adult man; masculine",
        "Food eaten at lunchtime",
        "Animal flesh used for food",
        "Flat-topped hill; table in Spanish",
        "Discount event at a store",
        "Identical; not different",
        "Line where two fabrics are joined",
        "Chair; place to sit",
        "Story; narrative",
        "Not wild; gentle and docile",
        "Blue-green color; type of duck",
        "Group working together"
      ],
      5: [
        "Peaks; highest points of achievement",
        "Desert animal with humps",
        "Social class; rigid social group",
        "Metal fitting on a shoe; holds a rope",
        "Brilliant display; dazzling success",
        "Delicate fabrics; shoe ties",
        "Dull things; hobbles",
        "Heavy clubs; spices used in cooking",
        "Adult men; masculine ones",
        "Foods eaten at lunchtime",
        "Animal flesh foods",
        "Hard substance; a type of element",
        "Discount events at stores",
        "Weighing device; climb up",
        "Lines where fabrics are joined",
        "Chairs; places to sit",
        "Stories; narratives",
        "Makes gentle and docile",
        "Blue-green colors; types of duck",
        "Groups working together"
      ],
      6: [
        "Desert animals with humps",
        "Fabric made from camel or goat hair",
        "Social classes; rigid social groups",
        "Fortified building; chess piece",
        "Metal fittings on shoes",
        "Brilliant displays; dazzling successes",
        "Hard substances; types of elements",
        "Weighing devices; climbs up"
      ],
      7: [
        "Most peaceful and serene (pangram!)",
        "Fabrics made from camel or goat hair",
        "Fortified buildings; chess pieces"
      ]
    }
  },

  // PUZZLE 48: RAMBLES
  {
    id: 'rambles-puzzle',
    subtitle: 'Wander on in!',
    letters: ['R', 'A', 'M', 'B', 'L', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 54,
    words: {
      4: ['ABLE', 'BALE', 'BARE', 'BASE', 'BEAM', 'BEAR', 'EARL', 'EARS', 'ERAS', 'LAME', 'MALE', 'MARE', 'MEAL', 'SALE', 'SEAM'],
      5: ['AMBLE', 'BALER', 'BALES', 'BARES', 'BEAMS', 'BEARS', 'BLAME', 'BLARE', 'BLEAR', 'BREAM', 'EARLS', 'LABEL', 'LAMES', 'MALES', 'MARES', 'MEALS', 'REALM', 'SABLE', 'SALES', 'SEAMS', 'SMEAR'],
      6: ['AMBLER', 'AMBLES', 'BALERS', 'BLAMES', 'BLARES', 'BLEARS', 'BREAMS', 'LABELS', 'LAMBER', 'MARBLE', 'RAMBLE', 'REALMS', 'SABLES', 'SMEARS'],
      7: ['AMBLERS', 'LAMBERS', 'MARBLES', 'RAMBLES']
    },
    hints: {
      4: [
        "Capable; having skill",
        "Bundle of hay",
        "Uncovered; naked",
        "Bottom; foundation",
        "Ray of light; support girder",
        "Large furry animal; endure",
        "British nobleman",
        "Hearing organs",
        "Historical time periods",
        "Dull; not exciting; hobble",
        "Adult man; masculine",
        "Female horse",
        "Food eaten at lunchtime",
        "Discount event at a store",
        "Line where two fabrics are joined"
      ],
      5: [
        "Walk at a leisurely pace",
        "One who bales hay",
        "Bundles of hay",
        "Uncovers; exposes",
        "Rays of light; support girders",
        "Large furry animals; endures",
        "Put responsibility on someone",
        "Loud noise; honk",
        "Dim or blurry; make dim",
        "Freshwater fish with a deep body",
        "British noblemen",
        "Tag attached to a product",
        "Dull things; hobbles",
        "Adult men; masculine ones",
        "Female horses",
        "Foods eaten at lunchtime",
        "Kingdom; domain",
        "Dark fur; dark color",
        "Discount events at stores",
        "Lines where fabrics are joined",
        "Smudge; spread grease on"
      ],
      6: [
        "One who walks at a leisurely pace",
        "Walks at a leisurely pace",
        "Ones who bale hay",
        "Puts responsibility on others",
        "Loud noises; honks",
        "Dim or blurry things; makes dim",
        "Freshwater fish with deep bodies",
        "Tags attached to products",
        "One who tends ewes during lambing",
        "Stone used in sculpture; pattern game",
        "Walk without a clear destination",
        "Kingdoms; domains",
        "Dark furs; dark colors",
        "Smudges; spreads grease on"
      ],
      7: [
        "Ones who walk at a leisurely pace",
        "Ones who tend ewes during lambing",
        "Stones used in sculpture; pattern games",
        "Walks without a clear destination (pangram!)"
      ]
    }
  },

    // PUZZLE 49: CABINET
  {
    id: 'cabinet-puzzle',
    subtitle: 'Called to order!',
    letters: ['C', 'A', 'B', 'I', 'N', 'E', 'T'],
    keyLetters: ['A', 'E'],
    totalWordCount: 20,
    words: {
      4: ['ABET', 'ACNE', 'ANTE', 'BANE', 'BEAN', 'BEAT', 'BETA', 'CANE', 'CATE', 'NEAT'],
      5: ['ABATE', 'EATEN', 'INANE'],
      6: ['BATTEN', 'BEATEN', 'BEANIE', 'INNATE'],
      7: ['ANCIENT', 'CABINET', 'CANTEEN']
    },
    hints: {
      4: [
        "Encourage or assist wrongdoing",
        "Skin condition with pimples",
        "Poker stake; put money in the pot",
        "Curse; something causing misery",
        "Legume; coffee variety",
        "Strike; pulsing rhythm",
        "Greek letter; test version of software",
        "Walking stick; sugar plant",
        "Delicacy; choice food item",
        "Tidy and organized"
      ],
      5: [
        "Reduce; lessen in intensity",
        "Consumed as food",
        "Silly and pointless; lacking sense"
      ],
      6: [
        "Strip of wood used to secure something",
        "Defeated; struck repeatedly",
        "Knitted hat; small bean-shaped hat",
        "Natural; inborn from birth"
      ],
      7: [
        "Very old; from long ago",
        "Group of senior government advisors (pangram!)",
        "Soldier's refreshment tent; drinks dispenser"
      ]
    }
  },

  // PUZZLE 50: AMBIENT
  {
    id: 'ambient-puzzle',
    subtitle: 'Feel the atmosphere!',
    letters: ['A', 'M', 'B', 'I', 'E', 'N', 'T'],
    keyLetters: ['A', 'E'],
    totalWordCount: 26,
    words: {
      4: ['ABET', 'ANTE', 'BANE', 'BATE', 'BEAN', 'BEAT', 'BETA', 'MANE', 'MATE', 'MEAN', 'MEAT', 'NAME', 'NEAT', 'TAME', 'TEAM'],
      5: ['ABATE', 'ABEAM', 'AMENT', 'ANIME', 'MEANT'],
      6: ['BATMEN', 'BEATEN', 'INMATE', 'INNATE'],
      7: ['AMBIENT'],
      9: ['INANIMATE']
    },
    hints: {
      4: [
        "Encourage or assist wrongdoing",
        "Poker stake; put money in the pot",
        "Curse; something causing misery",
        "Restrain; reduce in force",
        "Legume; coffee variety",
        "Strike; pulsing rhythm",
        "Greek letter; test version of software",
        "Lion's flowing neck hair",
        "Friend; chess ending",
        "Unkind; or an average",
        "Animal flesh used for food",
        "What you're called",
        "Tidy and organized",
        "Not wild; gentle and docile",
        "Group working together"
      ],
      5: [
        "Reduce; lessen in intensity",
        "Directly in front of a ship",
        "Flowering catkin cluster on a tree",
        "Japanese animation style",
        "Had in mind; intended to say"
      ],
      6: [
        "Officers' personal servants; caped crusaders",
        "Defeated; struck repeatedly",
        "Prisoner; one confined to a facility",
        "Natural; inborn from birth"
      ],
      7: [
        "Relating to the surrounding atmosphere (pangram!)"
      ],
      9: [
        "Without life; not living or moving"
      ]
    }
  },

  // PUZZLE 51: CALIBER
  {
    id: 'caliber-puzzle',
    subtitle: 'High standards only!',
    letters: ['C', 'A', 'L', 'I', 'B', 'E', 'R'],
    keyLetters: ['A', 'E'],
    totalWordCount: 21,
    words: {
      4: ['ABLE', 'ACRE', 'BALE', 'BARE', 'BEAR', 'CARE', 'EARL', 'LACE', 'RACE', 'REAL'],
      5: ['ABLER', 'BALER', 'BLARE', 'BLEAR', 'BRACE', 'CABER', 'CLEAR', 'LACER'],
      6: ['ECLAIR'],
      7: ['CALIBER', 'CALIBRE']
    },
    hints: {
      4: [
        "Capable; having skill",
        "Unit of land measurement",
        "Bundle of hay",
        "Uncovered; naked",
        "Large furry animal; endure",
        "Be concerned; look after",
        "British nobleman",
        "Delicate fabric; shoe tie",
        "Competition; run fast",
        "Genuine; actual"
      ],
      5: [
        "More capable; more skilled",
        "One who bales hay",
        "Loud noise; honk loudly",
        "Dim or blurry; make less clear",
        "Support device; prepare for impact",
        "Heavy wooden pole tossed in Scottish games",
        "Transparent; easy to understand",
        "One who laces shoes or corsets"
      ],
      6: [
        "French pastry filled with cream"
      ],
      7: [
        "Quality or standard of something (pangram!)",
        "Quality or standard of something, British spelling (pangram!)"
      ]
    }
  },

  // PUZZLE 52: BANGLES
  {
    id: 'bangles-puzzle',
    subtitle: 'Shake it up!',
    letters: ['B', 'A', 'N', 'G', 'L', 'E', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 39,
    words: {
      4: ['ABLE', 'AGES', 'ALES', 'BALE', 'BANE', 'BASE', 'BEAN', 'GALE', 'LANE', 'LEAN', 'SAGE', 'SALE', 'SANE'],
      5: ['ANGEL', 'ANGLE', 'BALES', 'BANES', 'BEANS', 'BLASE', 'GABLE', 'GALES', 'GLEAN', 'LABEL', 'LANES', 'LEANS', 'SABLE', 'SALES'],
      6: ['ANGELS', 'ANGLES', 'BANGLE', 'BEAGLE', 'ENABLE', 'GABLES', 'GLEANS', 'LABELS', 'SABLES'],
      7: ['BANGLES', 'BEAGLES', 'ENABLES']
    },
    hints: {
      4: [
        "Capable; having skill",
        "Time periods; grows older",
        "Types of beer",
        "Bundle of hay",
        "Source of harm; something causing misery",
        "Bottom; foundation",
        "Legume; coffee variety",
        "Strong wind; a sale of goods",
        "Narrow road; bowling path",
        "Thin; tilt to one side",
        "Wise herb; a wise person",
        "Discount event at a store",
        "Mentally sound; rational"
      ],
      5: [
        "Heavenly being with wings",
        "Geometric shape; point of view",
        "Bundles of hay",
        "Sources of harm; causes of misery",
        "Legumes; coffee varieties",
        "Bored and unimpressed; world-weary",
        "Triangular roof support; wall section",
        "Strong winds; sales of goods",
        "Gather bit by bit; collect information",
        "Tag attached to a product",
        "Narrow roads; bowling paths",
        "Tilts to one side",
        "Dark fur; dark color",
        "Discount events at stores"
      ],
      6: [
        "Heavenly beings with wings",
        "Geometric shapes; points of view",
        "Decorative bracelet worn on the wrist (pangram!)",
        "Long-eared hunting dog breed",
        "Make possible; allow to happen",
        "Triangular roof supports; wall sections",
        "Gathers bit by bit; collects information",
        "Tags attached to products",
        "Dark furs; dark colors"
      ],
      7: [
        "Decorative bracelets worn on the wrist (pangram!)",
        "Long-eared hunting dog breeds",
        "Makes possible; allows to happen"
      ]
    }
  },
  // PUZZLE 53: PELICAN
  {
    id: 'pelican-puzzle',
    subtitle: 'Dive right in!',
    letters: ['P', 'E', 'L', 'I', 'C', 'A', 'N'],
    keyLetters: ['A', 'E'],
    totalWordCount: 28,
    words: {
      4: ['ACNE', 'CANE', 'CAPE', 'LACE', 'LANE', 'LEAN', 'LEAP', 'NAPE', 'NEAP', 'PACE', 'PALE', 'PANE', 'PEAL'],
      5: ['ALIEN', 'ALINE', 'LANCE', 'LIANE', 'PANEL', 'PENAL', 'PLACE', 'PLANE'],
      6: ['APIECE', 'CANAPE', 'LAPINE', 'PINEAL'],
      7: ['CAPELIN', 'PELICAN'],
      8: ['PINNACLE']
    },
    hints: {
      4: [
        "Skin condition with pimples",
        "Walking stick; sugar plant",
        "Sleeveless cloak; coastal headland",
        "Delicate fabric; shoe tie",
        "Narrow road; bowling path",
        "Thin; tilt to one side",
        "Jump; spring forward",
        "Back of the neck",
        "Low tide; barely adequate",
        "Speed of movement; a single step",
        "Light in color; fence stake",
        "Sheet of window glass",
        "Ring out like bells"
      ],
      5: [
        "Being from another world; foreign",
        "Line up; arrange in a row",
        "Long spear; pierce to drain",
        "Tropical climbing plant; vine",
        "Flat section of wall; group of judges",
        "Subject to punishment; relating to penalties",
        "Location; position in a race",
        "Flat surface; aircraft"
      ],
      6: [
        "Each one; per item",
        "Small appetizer on bread or cracker",
        "Relating to rabbits",
        "Relating to the pineal gland in the brain"
      ],
      7: [
        "Small fish used in cooking",
        "Large seabird with a pouch bill (pangram!)"
      ],
      8: [
        "High pointed peak; crowning achievement"
      ]
    }
  },

  // PUZZLE 54: AIRPORTS
  {
    id: 'airports-puzzle',
    subtitle: 'Departures and arrivals!',
    letters: ['A', 'I', 'R', 'P', 'O', 'T', 'S'],
    keyLetters: ['A', 'I'],
    totalWordCount: 26,
    words: {
      4: ['ARIA', 'PAIR', 'PITA', 'SARI'],
      5: ['ARIAS', 'ATRIA', 'ATRIP', 'PAIRS', 'PATIO', 'PITAS', 'RAITA', 'RATIO', 'SARIS', 'TAPIR', 'TIARA'],
      6: ['ARISTO', 'PATIOS', 'RAITAS', 'RATIOS', 'TAPIRS', 'TIARAS'],
      7: ['AIRPORT', 'ARISTOS', 'PATRIOT'],
      8: ['AIRPORTS', 'PATRIOTS']
    },
    hints: {
      4: [
        "Operatic solo; a melody",
        "Two of a kind; matched set",
        "Flatbread used in wraps",
        "Wrapped garment worn in South Asia"
      ],
      5: [
        "Operatic solos; melodies",
        "Inner chambers; heart chambers",
        "Nautical term meaning anchor is clear",
        "Two of a kind; matched sets",
        "Outdoor courtyard or terrace",
        "Flatbreads used in wraps",
        "Indian yogurt and cucumber condiment",
        "Proportion; relationship between two amounts",
        "Wrapped garments worn in South Asia",
        "Large horse-like animal with a long snout",
        "Jeweled crown worn by royalty"
      ],
      6: [
        "Informal term for an aristocrat",
        "Outdoor courtyards or terraces",
        "Indian yogurt and cucumber condiments",
        "Proportions; relationships between amounts",
        "Large horse-like animals with long snouts",
        "Jeweled crowns worn by royalty"
      ],
      7: [
        "Hub for planes to land and take off (pangram!)",
        "Informal terms for aristocrats",
        "One who loves and defends their country",
      ],
      8: [
        "Hubs for planes to land and take off (pangram!)",
        "People who love and defend their country"
      ]
    }
  },

  // PUZZLE 55: FOUNDER
  {
    id: 'founder-puzzle',
    subtitle: 'Build something great!',
    letters: ['F', 'O', 'U', 'N', 'D', 'E', 'R'],
    keyLetters: ['E', 'R'],
    totalWordCount: 18,
    words: {
      4: ['EURO', 'FERN', 'FORE', 'RODE', 'RUDE', 'RUNE'],
      5: ['DONER', 'DRONE', 'UNDER'],
      6: ['ENDURE', 'ENURED', 'FONDER', 'FUNDER', 'FUNNER', 'REDONE', 'REFUND'],
      7: ['FOUNDER', 'REFOUND']
    },
    hints: {
      4: [
        "European currency",
        "Feathery plant found in woodlands",
        "Front part; golf warning shout",
        "Traveled on horseback; past tense of ride",
        "Impolite; rough in texture",
        "Magical symbol; letter in old alphabet"
      ],
      5: [
        "Rotating meat kebab; one who donates",
        "Pilotless aircraft; a low hum",
        "Below; less than"
      ],
      6: [
        "Withstand; put up with hardship",
        "Became hardened or accustomed",
        "More affectionate; more partial to",
        "One who provides financial backing",
        "More enjoyable; more entertaining",
        "Done over again; renovated",
        "Return money paid; reimbursement"
      ],
      7: [
        "One who establishes something new (pangram!)",
        "Establish again; set up once more"
      ]
    }
  },

  // PUZZLE 56: ARCHIVE
  {
    id: 'archive-puzzle',
    subtitle: 'History in the making!',
    letters: ['A', 'R', 'C', 'H', 'I', 'V', 'E'],
    keyLetters: ['A', 'E'],
    totalWordCount: 20,
    words: {
      4: ['ACER', 'ACHE', 'ACRE', 'AVER', 'CARE', 'CAVE', 'EACH', 'HARE', 'HAVE', 'HEAR', 'RACE', 'RAVE'],
      5: ['AERIE', 'REACH'],
      6: ['CAHIER', 'RACIER'],
      7: ['ACHIEVE', 'ARCHIVE'],
      8: ['ACHIEVER', 'ARCHIVER']
    },
    hints: {
      4: [
        "Maple tree genus",
        "Pain; dull persistent hurt",
        "Unit of land measurement",
        "To assert confidently as fact",
        "Be concerned; look after",
        "Underground hollow; a bat's home",
        "Every one individually",
        "Rabbit-like animal",
        "Possess; own something",
        "Perceive sound",
        "Competition; run fast",
        "Wild enthusiasm; speak passionately"
      ],
      5: [
        "Eagle's nest high on a cliff",
        "Extend to grab; arrive at a destination"
      ],
      6: [
        "Notebook or exercise book",
        "More risqué or daring"
      ],
      7: [
        "Reach a goal through effort",
        "Collection of historical records (pangram!)"
      ],
      8: [
        "One who reaches goals through effort",
        "One who manages historical records (pangram!)"
      ]
    }
  },
    // PUZZLE 57: CONTAINS
  {
    id: 'contains-puzzle',
    subtitle: 'What\'s inside counts!',
    letters: ['C', 'O', 'N', 'T', 'A', 'I', 'S'],
    keyLetters: ['A', 'O'],
    totalWordCount: 29,
    words: {
      4: ['COAT', 'IOTA', 'OAST', 'OATS', 'TACO'],
      5: ['CANON', 'CANTO', 'COATS', 'IOTAS', 'TACOS'],
      6: ['ACTION', 'ANOINT', 'ATONIC', 'CANONS', 'CANTOS', 'CASINO', 'CATION', 'NATION'],
      7: ['ACTIONS', 'ANOINTS', 'CASINOS', 'CATIONS', 'CONTAIN', 'NATIONS', 'STATION'],
      8: ['CONTAINS', 'SANCTION', 'STATIONS'],
      9: ['SANCTIONS']
    },
    hints: {
      4: [
        "Jacket; layer of paint",
        "Tiny amount; Greek letter",
        "A kiln for drying hops or malt",
        "Rolled oats for breakfast",
        "Mexican food in a crunchy shell"
      ],
      5: [
        "Church law; a rule or standard",
        "Section of a poem or song",
        "Jackets; layers of paint",
        "Tiny amounts; Greek letters",
        "Mexican foods in crunchy shells"
      ],
      6: [
        "Something done; a deed",
        "Consecrate with oil; dedicate formally",
        "Lacking muscle tone or stress",
        "Church laws; rules or standards",
        "Sections of poems or songs",
        "Place for gambling and entertainment",
        "Positively charged ion",
        "A country or state; citizenry"
      ],
      7: [
        "Deeds; things done",
        "Consecrates with oil; dedicates formally",
        "Places for gambling and entertainment",
        "Positively charged ions",
        "Hold within; keep inside",
        "Countries or states; citizenries",
        "Place where trains stop; a position"
      ],
      8: [
        "Holds within; keeps inside (pangram!)",
        "Official permission or penalty",
        "Places where trains stop; positions"
      ],
      9: [
        "Official permissions or penalties"
      ]
    }
  },

  // PUZZLE 58: SHARPEN
  {
    id: 'sharpen-puzzle',
    subtitle: 'Stay on point!',
    letters: ['S', 'H', 'A', 'R', 'P', 'E', 'N'],
    keyLetters: ['A', 'E'],
    totalWordCount: 47,
    words: {
      4: ['EARN', 'EARS', 'ERAS', 'HARE', 'HEAP', 'HEAR', 'NAPE', 'NEAR', 'PANE', 'PARE', 'REAP', 'SANE', 'SEAR'],
      5: ['ASHEN', 'EARNS', 'HARES', 'HEAPS', 'HEARS', 'NAPES', 'NEARS', 'PANES', 'PAREN', 'PARES', 'PARSE', 'PEARS', 'PHASE', 'REAPS', 'SANER', 'SHAPE', 'SHARE', 'SHEAR', 'SNARE', 'SPARE'],
      6: ['PARENS', 'PARSES', 'PHASES', 'PHRASE', 'SHAPES', 'SHARES', 'SHEARS', 'SNARES', 'SPARES'],
      7: ['HARNESS', 'NAPPERS', 'PHRASES', 'SHARPEN'],
      8: ['SHARPENS']
    },
    hints: {
      4: [
        "Make money; deserve",
        "Hearing organs",
        "Historical time periods",
        "Rabbit-like animal",
        "Pile of something; mound",
        "Perceive sound",
        "Back of the neck",
        "Close by; not far",
        "Sheet of window glass",
        "Peel or trim with a knife",
        "Harvest crops",
        "Mentally sound; rational",
        "Burn the surface; scorch"
      ],
      5: [
        "Pale gray; pale from shock",
        "Makes money; deserves",
        "Rabbit-like animals",
        "Piles of things; mounds",
        "Perceives sound",
        "Backs of necks",
        "Comes close to",
        "Sheets of window glass",
        "Short for parenthesis",
        "Peels or trims with a knife",
        "Analyze grammatically",
        "Fruits related to apples",
        "Stage or period of something",
        "Harvests crops",
        "More mentally sound",
        "Mold or contour",
        "Divide; portion out",
        "Cut with shears",
        "Trap for catching animals",
        "Extra; not tight"
      ],
      6: [
        "Short forms for parentheses",
        "Analyzes grammatically",
        "Stages or periods of something",
        "Group of words expressing an idea",
        "Molds or contours",
        "Divides; portions out",
        "Cuts with shears",
        "Traps for catching animals",
        "Extras; not tight ones"
      ],
      7: [
        "Restraints; straps holding something in",
        "People who nap frequently",
        "Groups of words expressing ideas",
        "Make keener or more acute (pangram!)"
      ],
      8: [
        "Makes keener or more acute (pangram!)"
      ]
    }
  },

  // PUZZLE 59: THERMOS
  {
    id: 'thermos-puzzle',
    subtitle: 'Keeping it warm or cold!',
    letters: ['T', 'H', 'E', 'R', 'M', 'O', 'S'],
    keyLetters: ['E', 'O'],
    totalWordCount: 46,
    words: {
      4: ['HERO', 'HOER', 'HOME', 'HOSE', 'MORE', 'ROSE', 'ROTE', 'SOME', 'SORE', 'TOME', 'TORE'],
      5: ['EMOTE', 'ETHOS', 'HEROS', 'HOMES', 'HORSE', 'METRO', 'MORES', 'MOTES', 'OTHER', 'ROTES', 'SHORE', 'SHOTE', 'SMOTE', 'STORE', 'THOSE', 'THROE', 'TOMES'],
      6: ['EMOTES', 'HORSES', 'METEOR', 'METROS', 'MOTHER', 'OTHERS', 'REMOTE', 'SHORES', 'STORES', 'THROES'],
      7: ['METEORS', 'MOTHERS', 'REMOTES', 'SMOTHER', 'THEOREM', 'THERMOS'],
      8: ['SMOTHERS', 'THEOREMS']
    },
    hints: {
      4: [
        "Brave or admired person",
        "One who hoes the garden",
        "Where you live; cozy place",
        "Flexible tube for water",
        "A greater amount; in addition",
        "A flower; came back up",
        "Learned by repetition; a plant",
        "A certain amount; rather",
        "Painful and aching",
        "A large book; heavy volume",
        "Ripped apart; past tense of tear"
      ],
      5: [
        "Express emotion dramatically",
        "The spirit or character of a culture",
        "Brave or admired people",
        "Cozy places; residences",
        "Large four-legged riding animal",
        "Urban subway or transit system",
        "Greater amounts; additional things",
        "Small specks of dust or material",
        "Different from this one; additional",
        "Learned by repetition; plants",
        "Rocky coastline; beach",
        "A young pig",
        "Struck with force; extinguished",
        "Shop; keep in a warehouse",
        "The ones over there; at that time",
        "A pang of pain or grief",
        "Large books; heavy volumes"
      ],
      6: [
        "Expresses emotion dramatically",
        "Large four-legged riding animals",
        "Space rock that burns in atmosphere",
        "Urban subway or transit systems",
        "Female parent; to fuss over",
        "Different ones; additional ones",
        "Far away; operated from a distance",
        "Rocky coastlines; beaches",
        "Shops; keeps in warehouses",
        "Pangs of pain or grief"
      ],
      7: [
        "Space rocks that burn in atmosphere",
        "Female parents; ones who fuss over",
        "Far away things; remote controls",
        "Suppress or suffocate completely",
        "Mathematical proposition to be proved",
        "Insulated flask that keeps drinks hot (pangram!)"
      ],
      8: [
        "Suppresses or suffocates completely",
        "Mathematical propositions to be proved"
      ]
    }
  },

    // PUZZLE 60: ORGANIC
  {
    id: 'organic-puzzle',
    subtitle: 'Naturally delicious!',
    letters: ['O', 'R', 'G', 'A', 'N', 'I', 'C'],
    keyLetters: ['A', 'O'],
    totalWordCount: 17,
    words: {
      4: ['ORCA', 'ROAN'],
      5: ['ACORN', 'CANON', 'CARGO', 'CONGA', 'GROAN', 'NARCO', 'ORANG', 'ORGAN'],
      6: ['CORONA', 'GARCON', 'OARING', 'RANCOR'],
      7: ['ORGANIC'],
      8: ['GROANING'],
      9: ['INORGANIC']
    },
    hints: {
      4: [
        "Large ocean dolphin relative",
        "Reddish-brown horse color"
      ],
      5: [
        "Nut that squirrels love",
        "Church law; a rule or standard",
        "Goods transported by ship or plane",
        "Latin percussion dance; drumbeat",
        "Low moan of complaint",
        "Drug trafficker; informal term",
        "Orangutan; informal short form",
        "Musical instrument; body part"
      ],
      6: [
        "Crown; halo around the sun; a virus",
        "Waiter; French term used in English",
        "Rowing a boat with oars",
        "Bitterness or deep resentment"
      ],
      7: [
        "Natural; free from chemicals (pangram!)"
      ],
      8: [
        "Moaning loudly and repeatedly"
      ],
      9: [
        "Not organic; made from non-living matter (pangram!)"
      ]
    }
  },

  // PUZZLE 61: TURNOVER
  {
    id: 'turnover-puzzle',
    subtitle: 'A fresh start every day!',
    letters: ['T', 'U', 'R', 'N', 'O', 'V', 'E'],
    keyLetters: ['O', 'E'],
    totalWordCount: 26,
    words: {
      4: ['EURO', 'NOTE', 'OVEN', 'OVER', 'ROTE', 'ROVE', 'TONE', 'TORE', 'VOTE'],
      5: ['NOTER', 'OUTER', 'OVERT', 'ROUTE', 'ROVER', 'TENOR', 'TONER', 'TROVE', 'VOTER'],
      6: ['ENROOT', 'NEURON', 'REVOTE'],
      7: ['NEURONE', 'NEUTRON', 'OVERRUN'],
      8: ['OVERTURN', 'TURNOVER']
    },
    hints: {
      4: [
        "European currency",
        "Written message; musical pitch",
        "Kitchen appliance for baking",
        "Above; finished",
        "Learned by repetition",
        "Wander or roam about",
        "Sound quality; shade of color",
        "Ripped apart; past tense of tear",
        "Cast a ballot in an election"
      ],
      5: [
        "One who writes things down",
        "On the outside; further away",
        "Open and not hidden",
        "Path taken; way to go",
        "Wanderer; Mars explorer",
        "Male singing voice",
        "Printer ink; skin care product",
        "Collection of treasures",
        "Person who casts a ballot"
      ],
      6: [
        "Establish firmly; take root",
        "Brain cell that transmits signals",
        "Vote again on the same matter"
      ],
      7: [
        "Brain cell that transmits signals; British spelling",
        "Subatomic particle with no charge",
        "Run past or beyond; exceed a limit"
      ],
      8: [
        "Flip upside down; reverse completely",
        "Rate of replacement; pastry filled with fruit (pangram!)"
      ]
    }
  },

  // PUZZLE 62: THREADS
  {
    id: 'threads-puzzle',
    subtitle: 'Pull it all together!',
    letters: ['T', 'H', 'R', 'E', 'A', 'D', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 80,
    words: {
      4: ['DARE', 'DATE', 'DEAR', 'EARS', 'ERAS', 'HARE', 'HATE', 'HEAD', 'HEAR', 'HEAT', 'RATE', 'READ', 'SEAR', 'TARE', 'TEAR'],
      5: ['DARES', 'DATES', 'DEARS', 'DEATH', 'DREAD', 'EARTH', 'HARES', 'HASTE', 'HATED', 'HATER', 'HEADS', 'HEARD', 'HEARS', 'HEART', 'HEATS', 'RATED', 'RATES', 'READS', 'SEARS', 'SHADE', 'SHARE', 'SHEAR', 'STARE', 'STEAD', 'TARES', 'TEARS', 'TRADE', 'TREAD'],
      6: ['DASHER', 'DEARTH', 'DEATHS', 'DREADS', 'EARTHS', 'HATERS', 'HATRED', 'HEADER', 'HEARSE', 'HEARTS', 'RASHER', 'SHADER', 'SHADES', 'SHARED', 'SHARER', 'SHARES', 'SHEARS', 'STARED', 'STARES', 'THREAD', 'TRADED', 'TRADER', 'TRADES', 'TREADS'],
      7: ['DASHERS', 'DEARTHS', 'HARDEST', 'HATREDS', 'HEADERS', 'RASHERS', 'SHADERS', 'THREADS', 'TRADERS', 'TRASHER'],
      8: ['HEADREST', 'THRASHED', 'THRASHES']
    },
    hints: {
      4: [
        "Challenge someone; be bold",
        "Calendar day; romantic outing",
        "Beloved; expensive",
        "Hearing organs",
        "Historical time periods",
        "Rabbit-like animal",
        "Strong dislike; despise",
        "Top of the body; leader",
        "Perceive sound",
        "Warmth from the sun or fire",
        "Speed; evaluate or rank",
        "Look at written words",
        "Burn the surface; scorch",
        "Weed; weight of a container",
        "Rip; eye drop"
      ],
      5: [
        "Challenges; acts boldly",
        "Calendar days; romantic outings",
        "Beloved ones",
        "End of life; dying",
        "Fear greatly; dread a thing",
        "Soil and rock beneath our feet",
        "Rabbit-like animals",
        "Urgency; hurried rush",
        "Strongly disliked; despised",
        "One who strongly dislikes",
        "Tops of bodies; leaders",
        "Perceived with the ears",
        "Perceives sound",
        "Organ that pumps blood",
        "Warmth from the sun; fires",
        "Evaluated; had a certain speed",
        "Speeds; evaluates",
        "Looks at written words",
        "Burns surfaces; scorches",
        "Shadow; lamp cover",
        "Divide; portion out",
        "Cut with shears",
        "Gaze; look fixedly",
        "Place; in good stead",
        "Weeds; container weights",
        "Rips; eye drops",
        "Exchange; business deal",
        "Walk heavily; tire pattern"
      ],
      6: [
        "One who dashes or runs quickly",
        "Scarcity; severe shortage",
        "Endings of life; dyings",
        "Fears greatly; dreads things",
        "Soils and rocks of the planet",
        "Ones who strongly dislike",
        "Deep dislike or animosity",
        "Title at top of a document",
        "Funeral vehicle; carriage",
        "Organs that pump blood",
        "More reckless; strips of bacon",
        "One who creates shadows",
        "Shadows; lamp covers",
        "Divided; portioned out",
        "One who divides",
        "Divides; portions out",
        "Cuts with shears",
        "Gazed; looked fixedly",
        "Gazes; looks fixedly",
        "Thin fiber running through fabric (pangram!)",
        "Exchanged; past tense of trade",
        "One who buys and sells goods",
        "Exchanges; business deals",
        "Walks heavily; tire patterns"
      ],
      7: [
        "Ones who dash or run quickly",
        "Scarcities; severe shortages",
        "Most difficult; toughest",
        "Deep dislikes or animosities",
        "Titles at tops of documents",
        "Strips of bacon; more reckless ones",
        "Ones who create shadows",
        "Thin fibers running through fabric (pangram!)",
        "Ones who buy and sell goods",
        "One who thrashes or beats"
      ],
      8: [
        "Support for resting your head",
        "Beat or flailed vigorously",
        "Beats or flails vigorously"
      ]
    }
  },
  // PUZZLE 63: PIONEERS
  {
    id: 'pioneers-puzzle',
    subtitle: 'Blazing new trails!',
    letters: ['P', 'I', 'O', 'N', 'E', 'R', 'S'],
    keyLetters: ['I', 'E'],
    totalWordCount: 36,
    words: {
      4: ['IRES', 'PIER', 'PINE', 'RIPE', 'RISE'],
      5: ['NOISE', 'OPINE', 'PIERS', 'PINES', 'RINSE', 'RISEN', 'SIREN', 'SPINE', 'SPIRE'],
      6: ['NOISES', 'NOSIER', 'OPINES', 'ORPINE', 'PONIES', 'RINSES', 'SENIOR', 'SNIPER', 'SPINES', 'SPIRES'],
      7: ['INSPIRE', 'PENSION', 'PIONEER', 'SENIORS', 'SNIPERS'],
      8: ['INSPIRES', 'PENSIONS', 'PIONEERS', 'POISONER'],
      9: ['PENSIONER', 'POISONERS'],
      10: ['PENSIONERS']
    },
    hints: {
      4: [
        "Angers or irritates",
        "Dock or walkway over water",
        "Evergreen tree with needles",
        "Ready to eat; mature",
        "Go upward; get out of bed"
      ],
      5: [
        "Unwanted sound; loud disturbance",
        "Hold and express an opinion",
        "Docks or walkways over water",
        "Evergreen trees with needles",
        "Wash lightly with water",
        "Gone up; out of bed",
        "Warning sound; mythical sea singer",
        "Backbone; pointed column",
        "Pointed tower; church steeple"
      ],
      6: [
        "Unwanted sounds; loud disturbances",
        "More inclined to snoop",
        "Holds and expresses opinions",
        "A succulent plant; stonecrop",
        "Small horses; small groups",
        "Washes lightly with water",
        "Older and more experienced person",
        "Hidden shooter; sharpshooter",
        "Backbones; pointed columns",
        "Pointed towers; church steeples"
      ],
      7: [
        "Fill with enthusiasm or motivation",
        "Regular payment to a retired person",
        "First settler; trailblazer (pangram!)",
        "Older and more experienced people",
        "Hidden shooters; sharpshooters"
      ],
      8: [
        "Fills with enthusiasm or motivation",
        "Regular payments to retired people",
        "First settlers; trailblazers (pangram!)",
        "One who administers poison"
      ],
      9: [
        "Retired person receiving regular payments",
        "Ones who administer poison"
      ],
      10: [
        "Retired people receiving regular payments"
      ]
    }
  },

  // PUZZLE 64: DEDICATES
  {
    id: 'dedicates-puzzle',
    subtitle: 'With heart and soul!',
    letters: ['D', 'E', 'I', 'C', 'A', 'T', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 43,
    words: {
      4: ['ACED', 'AIDE', 'CASE', 'DATE', 'EASE', 'EAST', 'EATS', 'IDEA', 'SATE', 'SEAT', 'TEAS'],
      5: ['ACTED', 'AIDED', 'AIDES', 'CADET', 'CASED', 'DATES', 'IDEAS', 'SATED', 'STATE', 'STEAD', 'TASTE'],
      6: ['CADETS', 'IDEATE', 'SEATED', 'SEDATE', 'STATED', 'STATES', 'STEADS', 'TASTED', 'TASTES'],
      7: ['ASCETIC', 'IDEATED', 'IDEATES', 'SATIATE', 'SEDATED'],
      8: ['ASCETICS', 'DEDICATE', 'DISTASTE', 'SATIATED', 'SATIATES'],
      9: ['DEDICATED', 'DEDICATES']
    },
    hints: {
      4: [
        "Scored a point; defeated easily",
        "Helper; assistant",
        "Container; instance or example",
        "Calendar day; romantic outing",
        "Comfort; make less difficult",
        "Compass direction; sunrise side",
        "Consumes food",
        "Thought or concept",
        "Satisfy fully",
        "Chair; place to sit",
        "Hot brewed beverages"
      ],
      5: [
        "Did something; performed",
        "Helped; assisted",
        "Helpers; assistants",
        "Junior military officer or student",
        "Put in a container; examined",
        "Calendar days; romantic outings",
        "Thoughts or concepts",
        "Satisfied fully",
        "Condition or territory; declare formally",
        "Place; in good stead",
        "Flavor; sample food"
      ],
      6: [
        "Junior military officers or students",
        "Form ideas or mental images",
        "Sitting in a chair; placed in a seat",
        "Calm; administer a sedative",
        "Declared formally; declared as fact",
        "Conditions or territories",
        "Places; positions",
        "Sampled food; tried out",
        "Flavors; samples food"
      ],
      7: [
        "One who practices extreme self-denial",
        "Formed ideas or mental images",
        "Forms ideas or mental images",
        "Satisfy fully; provide to excess",
        "Calmed; administered a sedative"
      ],
      8: [
        "Ones who practice extreme self-denial",
        "Commit fully to a cause or person (pangram!)",
        "Strong dislike or aversion",
        "Provided to excess; fully satisfied",
        "Satisfies fully; provides to excess"
      ],
      9: [
        "Committed fully to a cause or person (pangram!)",
        "Commits fully to a cause or person (pangram!)"
      ]
    }
  },

  // PUZZLE 65: CURRENTS
  {
    id: 'currents-puzzle',
    subtitle: 'Go with the flow!',
    letters: ['C', 'U', 'R', 'E', 'N', 'T', 'S'],
    keyLetters: ['U', 'E'],
    totalWordCount: 35,
    words: {
      4: ['CURE', 'RUNE', 'RUSE', 'SURE', 'TRUE', 'TUNE'],
      5: ['CURES', 'CURSE', 'NURSE', 'RUNES', 'TRUCE', 'TUNES'],
      6: ['CURSES', 'NURSES', 'RESCUE', 'RETURN', 'SECURE', 'TENURE', 'TRUCES', 'TURNER', 'UNREST'],
      7: ['CENSURE', 'CURRENT', 'ENCRUST', 'ENTRUST', 'RESCUES', 'RETURNS', 'SECURES', 'TENURES', 'TURNERS'],
      8: ['CENSURES', 'CURRENTS', 'CURTNESS', 'ENCRUSTS', 'ENTRUSTS']
    },
    hints: {
      4: [
        "Heal; remedy for illness",
        "Magical symbol; letter in old alphabet",
        "Trick or deception",
        "Certain and confident",
        "Accurate; genuine",
        "Musical note; melody"
      ],
      5: [
        "Heals; remedies for illness",
        "Wish ill upon; profane language",
        "Care for the sick",
        "Magical symbols; old alphabet letters",
        "Temporary peace agreement; ceasefire",
        "Musical notes; melodies"
      ],
      6: [
        "Wishes ill upon; uses profane language",
        "Cares for the sick",
        "Save from danger",
        "Go back; send back",
        "Make safe; fasten firmly",
        "Length of time holding a position",
        "Temporary peace agreements; ceasefires",
        "One who turns; a lathe operator",
        "Unease; lack of peace or calm"
      ],
      7: [
        "Formally criticize or reprimand",
        "Flow of water or air; up to date (pangram!)",
        "Cover with a hard outer layer",
        "Give responsibility to someone",
        "Saves from danger",
        "Goes back; sends back",
        "Makes safe; fastens firmly",
        "Lengths of time holding a position",
        "Ones who turn; lathe operators"
      ],
      8: [
        "Formally criticizes or reprimands",
        "Flows of water or air; up to date (pangram!)",
        "Shortness or abruptness in manner",
        "Covers with hard outer layers",
        "Gives responsibility to others"
      ]
    }
  },
  // PUZZLE 66: ROASTED
  {
    id: 'roasted-puzzle',
    subtitle: 'Hot out of the oven!',
    letters: ['R', 'O', 'A', 'S', 'T', 'E', 'D'],
    keyLetters: ['A', 'E'],
    totalWordCount: 52,
    words: {
      4: ['DARE', 'DATE', 'DEAR', 'EARS', 'EAST', 'EATS', 'ERAS', 'RATE', 'READ', 'SATE', 'SEAR', 'SEAT', 'TARE', 'TEAR'],
      5: ['ADORE', 'DARES', 'DATER', 'DATES', 'DEARS', 'OARED', 'ORATE', 'RATES', 'READS', 'SATED', 'SATES', 'SEARS', 'SEATS', 'STARE', 'STEAD', 'TARES', 'TEARS', 'TRADE', 'TREAD'],
      6: ['ADORED', 'ADORES', 'DATERS', 'ORATED', 'ORATES', 'STARED', 'STARES', 'STEADS', 'TRADES', 'TREADS'],
      7: ['ROASTED', 'ROASTER', 'TOASTED', 'TOASTER'],
      8: ['ASSORTED', 'ROADSTER', 'ROASTERS', 'TOASTERS'],
      9: ['ROADSTERS']
    },
    hints: {
      4: [
        "Challenge someone; be bold",
        "Calendar day; romantic outing",
        "Beloved; expensive",
        "Hearing organs",
        "Compass direction; sunrise side",
        "Consumes food",
        "Historical time periods",
        "Speed; evaluate or rank",
        "Look at written words",
        "Satisfy fully",
        "Burn the surface; scorch",
        "Chair; place to sit",
        "Weed; weight of a container",
        "Rip; eye drop"
      ],
      5: [
        "Worship; love deeply",
        "Challenges; acts boldly",
        "One who sets a time or goes on dates",
        "Calendar days; romantic outings",
        "Beloved ones",
        "Having oars; fitted with oars",
        "Speak formally; give a speech",
        "Speeds; evaluates",
        "Looks at written words",
        "Satisfied fully",
        "Satisfies fully",
        "Burns surfaces; scorches",
        "Chairs; places to sit",
        "Gaze; look fixedly",
        "Place; in good stead",
        "Weeds; container weights",
        "Rips; eye drops",
        "Exchange; business deal",
        "Walk heavily; tire pattern"
      ],
      6: [
        "Worshipped; loved deeply",
        "Worships; loves deeply",
        "Ones who set times or go on dates",
        "Spoke formally; gave a speech",
        "Speaks formally; gives speeches",
        "Gazed; looked fixedly",
        "Gazes; looks fixedly",
        "Places; positions",
        "Exchanges; business deals",
        "Walks heavily; tire patterns"
      ],
      7: [
        "Cooked in dry heat (pangram!)",
        "Pan for cooking in dry oven heat",
        "Browned with heat; honored with a toast",
        "Kitchen appliance that makes toast"
      ],
      8: [
        "Mixed together; varied collection",
        "Open-topped car with a long hood",
        "Pans for cooking in dry oven heat",
        "Kitchen appliances that make toast"
      ],
      9: [
        "Open-topped cars with long hoods"
      ]
    }
  },

  // PUZZLE 67: SUPPORTER
  {
    id: 'supporter-puzzle',
    subtitle: 'Cheering you on!',
    letters: ['S', 'U', 'P', 'O', 'R', 'T', 'E'],
    keyLetters: ['O', 'E'],
    totalWordCount: 56,
    words: {
      4: ['PESO', 'POET', 'PORE', 'POSE', 'ROPE', 'ROSE', 'ROTE', 'SORE'],
      5: ['OUTER', 'PORES', 'PROSE', 'REPOT', 'ROPES', 'ROUSE', 'ROUTE', 'SPORE', 'STORE', 'TOPER', 'TROPE'],
      6: ['OUSTER', 'OUTERS', 'POSEUR', 'POSTER', 'POURER', 'POUTER', 'PRESTO', 'REPOST', 'REPOTS', 'ROUSES', 'ROUTES', 'SPORES', 'STORES', 'TOPERS', 'TOPPER', 'TOURER', 'TROPES', 'TROUPE'],
      7: ['OUSTERS', 'POSEURS', 'POSTERS', 'POSTURE', 'POURERS', 'POUTERS', 'PRESTOS', 'REPOSTS', 'STOUTER', 'TOPPERS', 'TOURERS', 'TROUPER', 'TROUPES', 'TROUSER'],
      8: ['POSTURES', 'TROUPERS', 'TROUSERS'],
      9: ['SUPPORTER'],
      10: ['SUPPORTERS']
    },
    hints: {
      4: [
        "Currency of Mexico and other countries",
        "One who writes verse; creative writer",
        "Opening in a wall; look intently",
        "Strike a position; pretend",
        "Thick cord; lasso",
        "A flower; came back up",
        "Learned by repetition",
        "Painful and aching"
      ],
      5: [
        "On the outside; further away",
        "Openings in walls; looks intently",
        "Written text; formal writing style",
        "Transfer a plant to a new pot",
        "Thick cords; lassos",
        "Stir up; wake from sleep",
        "Path taken; way to go",
        "Fungal organism; mushroom type",
        "Shop; keep in a warehouse",
        "One who drinks the top of the barrel",
        "Figure of speech; recurring theme"
      ],
      6: [
        "One who forces someone out",
        "Those on the outside",
        "One who strikes poses; affected person",
        "One who puts up notices; bill poster",
        "One who pours liquid",
        "One who pouts or sulks",
        "Magic word; ta-da! A type of coffee",
        "Post again; share online again",
        "Transfers plants to new pots",
        "Stirs up; wakes from sleep",
        "Paths taken; ways to go",
        "Fungal organisms; mushroom types",
        "Shops; keeps in warehouses",
        "Ones who drink from the top",
        "One who tops; something placed on top",
        "One who goes on tours",
        "Figures of speech; recurring themes",
        "Group of traveling performers"
      ],
      7: [
        "Ones who force someone out",
        "Ones who strike poses; affected people",
        "Ones who put up notices",
        "Body position; the way you hold yourself",
        "Ones who pour liquid",
        "Ones who pout or sulk",
        "Magic words; types of coffee",
        "Posts again; shares online again",
        "More sturdy; more robust",
        "Ones who top; things placed on top",
        "Ones who go on tours",
        "Reliable member of a performing group",
        "Groups of traveling performers",
        "Leg covering garment; pants (British)"
      ],
      8: [
        "Body positions; the way you hold yourself",
        "Reliable members of performing groups",
        "Leg covering garments; pants (British)"
      ],
      9: [
        "One who cheers on and encourages (pangram!)"
      ],
      10: [
        "Ones who cheer on and encourage (pangram!)"
      ]
    }
  },
  // PUZZLE 68: SPLATTER
  {
    id: 'splatter-puzzle',
    subtitle: 'Make a big splash!',
    letters: ['S', 'P', 'L', 'A', 'T', 'E', 'R'],
    keyLetters: ['A', 'E'],
    totalWordCount: 84,
    words: {
      4: ['ALES', 'APES', 'AREA', 'EARL', 'EARS', 'EAST', 'EATS', 'ERAS', 'LATE', 'LEAP', 'PALE', 'PATE', 'PEAL', 'PEAR', 'PEAT', 'PLEA', 'RAPE', 'RATE', 'REAP', 'SALE', 'SATE', 'SEAL', 'SEAR', 'SEAT', 'TALE', 'TAPE', 'TARE', 'TEAL', 'TEAR'],
      5: ['ALERT', 'ALTER', 'ARLES', 'ASTER', 'EARLS', 'LAPSE', 'LASER', 'LATER', 'LEAPS', 'PALES', 'PARSE', 'PASTE', 'PATER', 'PEALS', 'PEARS', 'PETAL', 'PLATE', 'PLEAT', 'RAPES', 'RATES', 'REAPS', 'SALES', 'SLATE', 'SPARE', 'SPEAR', 'STALE', 'STARE', 'STEAL', 'TALES', 'TAPER', 'TAPES', 'TARES', 'TEALS', 'TEARS'],
      6: ['ALERTS', 'ALTERS', 'ASTERS', 'LASERS', 'PALEST', 'PETALS', 'PLATER', 'PLATES', 'PLEATS', 'STAPLE', 'TAPERS'],
      7: ['PLASTER', 'PLATERS', 'PSALTER', 'STAPLER', 'STAPLES'],
      8: ['PLASTERS', 'PSALTERS', 'SPLATTER', 'STAPLERS'],
      9: ['SPLATTERS']
    },
    hints: {
      4: [
        "Types of beer",
        "Primates; imitates someone",
        "Region; surface space",
        "British nobleman",
        "Hearing organs",
        "Compass direction; sunrise side",
        "Consumes food",
        "Historical time periods",
        "Not on time; deceased",
        "Jump; spring forward",
        "Light in color; fence stake",
        "Top of the head",
        "Ring out like bells",
        "Fruit related to apples",
        "Soil used in gardening",
        "Urgent request; legal argument",
        "Forced sexual assault",
        "Speed; evaluate or rank",
        "Harvest crops",
        "Discount event at a store",
        "Ocean mammal; close tightly",
        "Burn the surface; scorch",
        "Chair; place to sit",
        "Story; narrative",
        "Sticky strip; recording medium",
        "Weed; weight of a container",
        "Blue-green color; type of duck",
        "Rip; eye drop"
      ],
      5: [
        "Warning; alarm",
        "Change; modify",
        "Heraldic term for the lower half of a shield",
        "Star-shaped flower",
        "British noblemen",
        "Slip; temporary failure",
        "Focused light beam device",
        "After; more recent",
        "Jumps; springs forward",
        "Light colors; fence stakes",
        "Analyze grammatically",
        "Glue; soft dough mixture",
        "One who fathers a child",
        "Rings out like bells",
        "Fruits related to apples",
        "Flower part",
        "Flat dish; serving dish",
        "Fold in fabric; press flat",
        "Forced sexual assaults",
        "Speeds; evaluates",
        "Harvests crops",
        "Discount events at stores",
        "Rock; schedule",
        "Extra; not tight",
        "Weapon; throw a javelin",
        "Not fresh; old bread",
        "Gaze; look fixedly",
        "Take without permission",
        "Stories; narratives",
        "Narrow gradually; thin candle",
        "Sticky strips; recordings",
        "Weeds; container weights",
        "Blue-green colors; types of duck",
        "Rips; eye drops"
      ],
      6: [
        "Warnings; alarms",
        "Changes; modifies",
        "Star-shaped flowers",
        "Focused light beam devices",
        "Most light in color",
        "Flower parts",
        "One who applies a coating",
        "Flat dishes; serving dishes",
        "Folds in fabric; presses flat",
        "Fasten; secure with a clasp",
        "Narrow candles; tapers"
      ],
      7: [
        "Smooth coating material; cast material",
        "Ones who apply coatings",
        "Book of Psalms; hymn book",
        "Device for fastening papers together",
        "Fastens; secures with a clasp"
      ],
      8: [
        "Smooth coating materials; cast materials",
        "Books of Psalms; hymn books",
        "Splash messily (pangram!)",
        "Devices for fastening papers together"
      ],
      9: [
        "Splashes messily (pangram!)"
      ]
    }
  },

  // PUZZLE 69: MARINADE
  {
    id: 'marinade-puzzle',
    subtitle: 'Soak it all in!',
    letters: ['M', 'A', 'R', 'I', 'N', 'D', 'E'],
    keyLetters: ['A', 'E'],
    totalWordCount: 35,
    words: {
      4: ['AIDE', 'AMEN', 'DARE', 'DEAN', 'DEAR', 'EARN', 'IDEA', 'MADE', 'MANE', 'MARE', 'NAME', 'NEAR', 'READ'],
      5: ['AIMED', 'AIRED', 'MANED', 'NAMED'],
      6: ['ADMIRE', 'AIRMEN', 'ANEMIA', 'DANDER', 'MAIDEN', 'MAIMED', 'MAIMER', 'MARINE', 'MEDIAN', 'RAINED', 'REMAIN'],
      7: ['ADMIRED', 'ADMIRER', 'MARINER', 'MARRIED'],
      8: ['MARINADE', 'REMAINED'],
      9: ['REMAINDER']
    },
    hints: {
      4: [
        "Helper; assistant",
        "So be it; said at end of a prayer",
        "Challenge someone; be bold",
        "School administrator; church leader",
        "Beloved; expensive",
        "Make money; deserve",
        "Thought or concept",
        "Created; manufactured",
        "Lion's flowing neck hair",
        "Female horse",
        "What you're called",
        "Close by; not far",
        "Look at written words"
      ],
      5: [
        "Pointed or directed at a target",
        "Broadcast on radio or television",
        "Having a flowing neck mane",
        "Given a name; called something"
      ],
      6: [
        "Look up to; regard with respect",
        "Male members of a military flight crew",
        "Iron-deficiency blood condition",
        "Loose skin flakes; anger or irritation",
        "Young unmarried woman; first time",
        "Injured by crushing; dented",
        "One who injures by crushing",
        "Soldier of the sea",
        "Middle value; relating to the middle",
        "Fell as water from the sky",
        "Stay behind; continue to be"
      ],
      7: [
        "Looked up to; regarded with respect",
        "One who looks up to someone",
        "Sailor who navigates by the stars",
        "Joined in matrimony; wed"
      ],
      8: [
        "Seasoning liquid for soaking meat (pangram!)",
        "Continued to be; stayed behind"
      ],
      9: [
        "What is left over; the rest"
      ]
    }
  },

  // PUZZLE 70: POPSICLE
  {
    id: 'popsicle-puzzle',
    subtitle: 'Cool down with this one!',
    letters: ['P', 'O', 'S', 'I', 'C', 'L', 'E'],
    keyLetters: ['O', 'E'],
    totalWordCount: 26,
    words: {
      4: ['COLE', 'COPE', 'LOPE', 'LOSE', 'OLEO', 'POLE', 'POSE', 'SLOE', 'SOLE'],
      5: ['CLOSE', 'COLES', 'COPES', 'ELOPE', 'LOPES', 'POLES', 'POSES', 'SCOPE', 'SLOPE'],
      6: ['ELOPES', 'POLICE', 'SCOPES', 'SLOPES'],
      7: ['POLICES'],
      8: ['POLICIES', 'POPSICLE'],
      9: ['POPSICLES']
    },
    hints: {
      4: [
        "A type of leafy green vegetable",
        "Deal with; manage a situation",
        "Run at an easy pace",
        "Misplace; fail to win",
        "Margarine; a type of olive oil",
        "Long stick; unit of measurement",
        "Strike a position; pretend",
        "A dark berry used in sloe gin",
        "Bottom of a shoe; only one"
      ],
      5: [
        "Shut; nearby; nearly",
        "Types of leafy green vegetables",
        "Deals with; manages situations",
        "Run away together; flee secretly",
        "Runs at an easy pace",
        "Long sticks; units of measurement",
        "Strikes positions; pretends",
        "Range of view; extent of coverage",
        "Incline; slanted surface"
      ],
      6: [
        "Runs away together; flees secretly",
        "Law enforcement; keep order",
        "Ranges of view; extents of coverage",
        "Inclines; slanted surfaces"
      ],
      7: [
        "Enforces law and order"
      ],
      8: [
        "Rules or plans of action",
        "Frozen treat on a stick (pangram!)"
      ],
      9: [
        "Frozen treats on sticks (pangram!)"
      ]
    }
  },

  // PUZZLE 71: SKELETON
  {
    id: 'skeleton-puzzle',
    subtitle: 'Down to the bone!',
    letters: ['S', 'K', 'E', 'L', 'T', 'O', 'N'],
    keyLetters: ['E', 'O'],
    totalWordCount: 28,
    words: {
      4: ['LONE', 'LOSE', 'NOEL', 'NOSE', 'NOTE', 'ONES', 'SLOE', 'SOLE', 'TOES', 'TOLE', 'TONE'],
      5: ['NOELS', 'NOTES', 'ONSET', 'STOKE', 'STOLE', 'STONE', 'TOLES', 'TONES'],
      6: ['KETONE', 'ONSETS', 'STOKES', 'STOLEN', 'STOLES', 'STONES'],
      7: ['KETONES'],
      8: ['SKELETON'],
      9: ['SKELETONS']
    },
    hints: {
      4: [
        "Solitary; by oneself",
        "Misplace; fail to win",
        "Christmas carol; a boy's name",
        "Facial feature for smelling",
        "Written message; musical pitch",
        "Single items; individuals",
        "A dark berry used in sloe gin",
        "Bottom of a shoe; only one",
        "Foot digits",
        "Decorative painted tinware",
        "Sound quality; shade of color"
      ],
      5: [
        "Christmas carols; boys' names",
        "Written messages; musical pitches",
        "Beginning; start of something",
        "Stir up a fire; provoke interest",
        "Long loose garment; took without right",
        "Rock; fruit seed",
        "Decorative painted tinwares",
        "Sound qualities; shades of color"
      ],
      6: [
        "Chemical compound found in blood",
        "Beginnings; starts of something",
        "Stirs up a fire; provokes interest",
        "Taken without right; pilfered",
        "Long loose garments",
        "Rocks; fruit seeds"
      ],
      7: [
        "Chemical compounds found in blood"
      ],
      8: [
        "The bones of a body (pangram!)"
      ],
      9: [
        "The bones of multiple bodies (pangram!)"
      ]
    }
  },
  // PUZZLE 72: TAKEOFFS
  {
    id: 'takeoffs-puzzle',
    subtitle: 'Up, up, and away!',
    letters: ['T', 'A', 'K', 'E', 'O', 'F', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 33,
    words: {
      4: ['EAST', 'EATS', 'FAKE', 'FATE', 'FEAT', 'FETA', 'SAFE', 'SAKE', 'SATE', 'SEAT', 'TAKE', 'TEAK'],
      5: ['FAKES', 'FATES', 'FEATS', 'SAFES', 'SAKES', 'SATES', 'SEATS', 'SKATE', 'STAKE', 'STEAK', 'TAKES', 'TEAKS'],
      6: ['SAFEST', 'SKATES', 'STAKES', 'STEAKS'],
      7: ['FASTEST', 'OFFTAKE', 'TAKEOFF'],
      8: ['OFFTAKES', 'TAKEOFFS']
    },
    hints: {
      4: [
        "Compass direction; sunrise side",
        "Consumes food",
        "Not real; counterfeit",
        "Destiny; what will happen",
        "Achievement; impressive act",
        "Greek cheese used in salads",
        "Not dangerous; secure",
        "Purpose; for goodness ___",
        "Satisfy fully",
        "Chair; place to sit",
        "Grab; bring along",
        "Tropical hardwood; sailing ship material"
      ],
      5: [
        "Not real ones; counterfeits",
        "Destinies; what will happen",
        "Achievements; impressive acts",
        "Secure storage boxes; not dangerous ones",
        "Purposes; reasons",
        "Satisfies fully",
        "Chairs; places to sit",
        "Glide on ice with blades",
        "Pointed post; claim something",
        "Beef cut; dinner centerpiece",
        "Grabs; brings along",
        "Tropical hardwoods; sailing ship materials"
      ],
      6: [
        "Most secure; most protected",
        "Glides on ice with blades",
        "Pointed posts; claims something",
        "Beef cuts; dinner centerpieces"
      ],
      7: [
        "Most quick; most rapid",
        "Removal of gas or liquid from a source",
        "Plane departure; comedic impression (pangram!)"
      ],
      8: [
        "Removals of gas or liquid from sources",
        "Plane departures; comedic impressions (pangram!)"
      ]
    }
  },

  // PUZZLE 73: MANAGERS
  {
    id: 'managers-puzzle',
    subtitle: 'Who\'s in charge here?',
    letters: ['M', 'A', 'N', 'G', 'E', 'R', 'S'],
    keyLetters: ['A', 'E'],
    totalWordCount: 67,
    words: {
      4: ['AMEN', 'AREA', 'EARN', 'EARS', 'ERAS', 'GAME', 'GEAR', 'MARE', 'MEAN', 'NAME', 'NEAR', 'RAGE', 'REAM', 'SAGE', 'SAME', 'SANE', 'SEAM', 'SEAR'],
      5: ['AMENS', 'ANGER', 'AREAS', 'ARENA', 'EARNS', 'GAMER', 'GAMES', 'GEARS', 'MANES', 'MARES', 'MEANS', 'NAMES', 'NEARS', 'RAGES', 'RAMEN', 'RANGE', 'REAMS', 'SAGES', 'SANER', 'SEAMS', 'SEARS', 'SNARE'],
      6: ['ANGERS', 'ARENAS', 'GAMERS', 'GARNER', 'GRANGE', 'MANAGE', 'MANGER', 'MANNER', 'MENAGE', 'NAGGER', 'RAMENS', 'RANGER', 'RANGES', 'RENAME', 'SEAMEN', 'SNARES'],
      7: ['GARNERS', 'GRANGES', 'MANAGER', 'MANAGES', 'MANGERS', 'MANNERS', 'MENAGES', 'NAGGERS', 'RANGERS', 'RENAMES'],
      8: ['MANAGERS']
    },
    hints: {
      4: [
        "So be it; said at end of a prayer",
        "Region; surface space",
        "Make money; deserve",
        "Hearing organs",
        "Historical time periods",
        "Activity with rules; wild animal",
        "Mechanical cog; equipment",
        "Female horse",
        "Unkind; or an average",
        "What you're called",
        "Close by; not far",
        "Intense anger; fury",
        "Large quantity of paper; daydream",
        "Wise person; herb used in cooking",
        "Identical; not different",
        "Mentally sound; rational",
        "Line where two fabrics are joined",
        "Burn the surface; scorch"
      ],
      5: [
        "So be it phrases; prayer endings",
        "Strong feeling of annoyance",
        "Regions; surface spaces",
        "Sports venue; open area for competition",
        "Makes money; deserves",
        "One who plays video games",
        "Activities with rules; wild animals",
        "Mechanical cogs; equipment",
        "Lions' flowing neck hair",
        "Female horses",
        "Methods; averages",
        "What people are called",
        "Comes close to",
        "Intense angers; furies",
        "Japanese noodle soup",
        "Span of distance; mountain chain",
        "Large quantities of paper",
        "Wise people; herbs used in cooking",
        "More mentally sound",
        "Lines where fabrics are joined",
        "Burns surfaces; scorches",
        "Trap for catching animals"
      ],
      6: [
        "Strong feelings of annoyance",
        "Sports venues; open areas for competition",
        "Ones who play video games",
        "Collect and store; gather rewards",
        "Farm with outbuildings; farming cooperative",
        "Oversee; handle a situation",
        "Feeding trough for animals",
        "Way of doing something; polite behavior",
        "A household; domestic group",
        "One who pesters or complains repeatedly",
        "Japanese noodle soups",
        "Park protector; forest guide",
        "Spans; mountain chains",
        "Give a new name to",
        "Sailors; navy men",
        "Traps for catching animals"
      ],
      7: [
        "Collects and stores; gathers rewards",
        "Farms with outbuildings; cooperatives",
        "One who oversees a team or business (pangram!)",
        "Oversees; handles situations",
        "Feeding troughs for animals",
        "Ways of doing things; polite behaviors",
        "Households; domestic groups",
        "Ones who pester or complain repeatedly",
        "Park protectors; forest guides",
        "Gives new names to"
      ],
      8: [
        "People who oversee teams or businesses (pangram!)"
      ]
    }
  },

];

// Get today's puzzle dynamically based on rotation
export function getTodaysPuzzle() {
  // ANCHOR DATE: March 8, 2026 at 7 AM = Index 0 (first puzzle)
  const anchorDate = new Date(2026, 5, 9, 7, 0, 0, 0); // Month is 0-indexed, so 2 = March
  
  const now = new Date();
  const estTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  const hour = estTime.getHours();
  const puzzleDate = new Date(estTime);
  
  if (hour < 7) {
    puzzleDate.setDate(puzzleDate.getDate() - 1);
  }
  puzzleDate.setHours(7, 0, 0, 0);
  
  const daysSinceAnchor = Math.round((puzzleDate - anchorDate) / (1000 * 60 * 60 * 24));
  const puzzleIndex = ((daysSinceAnchor % PUZZLES.length) + PUZZLES.length) % PUZZLES.length;
  
  return PUZZLES[puzzleIndex];
}

function getYesterdaysPuzzle() {
  // Same anchor date as getTodaysPuzzle
  const anchorDate = new Date(2026, 5, 9, 7, 0, 0, 0); // Month is 0-indexed, so 2 = March
  
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
  
  const daysSinceAnchor = Math.round((puzzleDate - anchorDate) / (1000 * 60 * 60 * 24));
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
      const saved = localStorage.getItem(`letterGriddleCafeGame_s2_${puzzleData.id}`);
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
      
      const savedStats = localStorage.getItem('letterGriddleCafeStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      
      const savedDarkMode = localStorage.getItem('letterGriddleCafeDarkMode');
      if (savedDarkMode) {
        setDarkMode(JSON.parse(savedDarkMode));
      }
      
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
        localStorage.setItem(`letterGriddleCafeGame_s2_${puzzleData.id}`, JSON.stringify({
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
    const shareText = `☕ Letter Griddle Cafe\n\n${achievement.icon} ${achievement.title}\n${foundCount}/${totalWords} words (${percentage}%)\n\n🎵${getFoundByLength(4)} ☕${getFoundByLength(5)} 🍯${getFoundByLength(6)} 🧈${getFoundByLength(7)} 🥞${getFoundByLength(8)} 👑${getFoundByLength(9)} 🏆${getFoundByLength(10)} 💎${getFoundByLength(11)}\n\n🔥 Streak: ${stats.currentStreak} days\n\nPlay at lettergriddlecafe.com/game\nMore games: lettergriddle.com`;
    
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
  const resetProgress = () => {
  try {
    localStorage.removeItem(`letterGriddleCafeGame_s2_${puzzleData.id}`);
    setFoundWords(new Set());
    setCurrentWord('');
    setMessage('Progress reset! Fresh start ☕');
    setMessageType('encouragement');
  } catch (e) {
    console.error('Could not reset progress', e);
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
            <button
  onClick={() => { resetProgress(); setShowStats(false); }}
  style={{
    width: '100%',
    padding: '12px',
    borderRadius: '9999px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    backgroundColor: theme.errorBg,
    color: theme.errorText,
    border: `2px solid ${theme.cardBorder}`,
    marginTop: '8px'
  }}
>
  🔄 Reset Today's Progress
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
