'use client';

import React, { useState, useEffect } from 'react';
import { track } from '@vercel/analytics';
// Character data
const characters = [
  {
    id: 'laurel',
    name: 'Laurel',
    emoji: '🥞',
    bio: [
      'Owner of the Letter Griddle Cafe',
      'Keeps the pancakes stacked high, the cinnamon rolls warm, the coffee fresh, and the chaos under control',
    ],
    funFacts: [
      'Combines cafe, cooking, and fun',
      'Plans the cafe activities and the crew supplies the entertainment',
    ],
  },
  {
    id: 'sarah',
    name: 'Sarah',
    emoji: '🌟',
    bio: [
      'Intelligent and thoughtful member of the trivia crew',
      'First to notice what others need',
    ],
    funFacts: [
      'Shares insights at critical cafe and trivia moments',
      'Thinks ahead for the trivia crew',
    ],
  },
  {
    id: 'mrs-lindsay',
    name: 'Mrs. Lindsay',
    emoji: '☕',
    bio: [
      'One half of the beloved Lindsay duo',
      'Appreciates a good cup of coffee',
    ],
    funFacts: [
      'Does her own research on trivia matters',
      'Retired teacher, owns Lending a Paw with Mr. Lindsay',
    ],
  },
  {
    id: 'mr-lindsay',
    name: 'Mr. Lindsay',
    emoji: '⚡️',
    bio: [
      'The boisterous half of the Lindsay duo',
      'Never met a stranger',
    ],
    funFacts: [
      'Aficionado of all dog breeds',
      'Retired teacher, owns Lending a Paw with Mrs. Linsday',
    ],
  },
  {
    id: 'jennie',
    name: 'Jennie',
    emoji: '🍩',
    bio: [
      'Devoted to Isaac',
      'Knits',
    ],
    funFacts: [
      'Can be counted on to bring treats',
      'Chihuahua aficionado',
    ],
  },
  {
    id: 'isaac',
    name: 'Isaac',
    emoji: '🐾',
    bio: [
      "Jennie's chihuahua",
      'Popular four-legged member of the trivia crew',
    ],
    funFacts: [
      'Has a sweet tooth',
      'Expressively yaps when the moment calls for it',
    ],
  },
  {
    id: 'taylor',
    name: 'Taylor B.',
    emoji: '🟠',
    bio: [
      "The crew's resident tech wizard",
      'Designed the orange Letter Griddle app icon',
    ],
    funFacts: [
      'Single-handedly saved Jukebox',
      'Ask him if he still wears cool sunglasses',
    ],
  },
  {
    id: 'josephine',
    name: 'Josephine',
    emoji: '🤲',
    bio: [
      "Josie's mother",
      'Pitches in wherever she is needed',
    ],
    funFacts: [
      'Once owned a pair of saddle shoes',
      'Makes delicious cinnamon pancakes',
    ],
  },
  {
    id: 'josie',
    name: 'Josie',
    emoji: '☀️',
    bio: [
      "Josephine's daughter",
      'The youngest member of the trivia crew',
    ],
    funFacts: [
      'Adores Isaac, but prefers cats',
      'Always up for the next adventure',
    ],
  },
  {
    id: 'jukebox',
    name: 'Jukebox',
    emoji: '🎵',
    bio: [
      "The cafe's beloved ambient music player",
      'The soul of Sunday trivia night',
    ],
    funFacts: [
      "Known for Sunday jazz",
      'In several games found at lettergriddle.com',
    ],
  },
  {
    id: 'griddles',
    name: 'Griddles',
    emoji: '🐈',
    bio: [
      'Coming soon...',
      'Emerges at interesting times',
    ],
    funFacts: [
      'The Letter Griddle Cafe cat',
      'Gigi to cafe regulars',
    ],
  },
];
// Story/Vignette data - easily expandable for future stories
const stories = [
  {
    id: 'trivia-night',
    title: 'Trivia Night',
    subtitle: 'The King of Terriers',
    date: 'December 2025',
    content: [
      'Jukebox, as it\'s affectionately referred to by the Sunday night trivia crew, plays the final notes of its ambient instrumental. Silence signals the end of the night when the cafe needs Laurel\'s attention.',
      '"Sizzle-drip-sizzle…" the coffee pot reminds Laurel to turn it off and of Sarah deferring her second cup of coffee to Mrs. Lindsay, who needed a bit of a jolt to answer that last trivia question.',
      '"This final question is for all the dog lovers out there," Laurel teased her crowd of trivia enthusiasts knowing the group shares a love of animals.',
      '"What dog breed is the king of the terriers?" Laurel asked.',
      '"They are all kings!" Mr. and Mrs. Lindsay chimed in unison.',
      '"It\'s not...Chihuahua?!" Jennie responded, as she gently covered Isaac\'s ears.',
      '"Dogs, kings? Let\'s talk about cats!" Josie whispered to her mother.',
      'Holding back laughter as the group revealed their opinions rather than answer the question, Laurel read, "The king of terriers is the Airedale."',
      '"Ugh!" Josephine reacted, patting Josie\'s hand.',
      '"Oh, I might have heard that on an episode of Animal Planet," Taylor B. admitted.',
      '"Who\'s to say who\'s a king?" Jennie demanded, then whispered something inaudible into Isaac\'s ears as she offered him a tasty morsel from her plate.',
      '"So many dogs, so much cuteness and love!" Mr. Lindsay gushed, attempting to soothe himself, Jennie, and her furry companion.',
      'Mrs. Lindsay concurred with her husband\'s adoration and Laurel\'s answer but promised to do her own research.',
      'The other players were having their sidebar conversations that lasted anywhere from "a sip of coffee to I need another cinnamon bun."'
    ],
    closing: 'Friends, return next Sunday at 7pm for another serving.'
  },
  {
    id: 'coffee-coffee-coffee',
    title: 'Coffee, Coffee, Coffee',
    subtitle: 'Nourishing Friends',
    date: 'December 2025',
    content: [
      '"Mrs. Lindsay, I know you like your coffee with one-third cream and two sugar packets, like I do. Have this one," Sarah offered, "I haven\'t sipped from it yet."',
      '"Sarah, you know me so well!" Mrs. Lindsay gladly accepted amid the buzz in the room about pups, cinnamon buns, and the current temperature of their coffee.',
      '"Coffee, coffee, coffee," Laurel muses as she prepares the machine for the next day.',
      'As she replenishes the sugar, stirrers, and paper coffee cup cozies, Laurel reads the plaque hanging on the wall. The embroidered stitching in various shades of pancake- and coffee-colored threads reveals the Letter Griddle mission statement.',
      'Nourishing friends of Griddle Falls, one meal at a time.',
      'Turning out the lights, leaving the cafe to head for home, Laurel pauses, "Thanks for another fun trivia night. See you sooner than later, LG."'
    ],
    closing: 'Friends, we will meet you back here sooner than later.'
  },
  {
  id: 'add-one-jukebox',
  title: 'Add One Jukebox',
  subtitle: '🎵 Opening Sunday at 7 PM',
  date: 'December 2025',
  locked: false,
  content: [
    'Walking to her SUV, Laurel notices Mr. and Mrs. Lindsay, Jennie, and Isaac in a post-trivia huddle.',
    '"I gave Isaac a small bite of my frosted cinnamon roll," Laurel overhears Jennie, as she tenderly gazes at Isaac.',
    '"Isaac\'s just like this one," Mrs. Lindsay reveals as she gestures toward Mr. Lindsay.',
    '"Who\'s a good boy? Who\'s got a sweet tooth?" Mr. Lindsay lovingly asks as he scratches Isaac\'s ear.',
    '"Are those suggestions for trivia questions for next week?" Laurel muses as she joins the group.',
    '"That second question will have more than one right answer," Mrs. Lindsay speaks from experience.',
    '"Oh, Laurel, you know those cinnamon rolls are what we look forward to the most!" Jennie proclaims.',
    'Mr. Lindsay offers, "Well, of course, after the lovely crew of characters…" as he continues his love fest with the chihuahua, "cute, little fluffy doggies are characters."',
    '"Coffee and more coffee!" Mrs. Lindsay adds to the growing list of Letter Griddle Cafe charms.',
    '"Crew, you remember two Sunday evenings ago when we didn\'t have Ju—," Laurel begins.',
    '"Jukebox!" The group responds in trivia style.',
    '"Taylor B. figured out how to replace the tracks to bring our dear Jukebox into the modern age," Jennie remembers.',
    '"We didn\'t dance," Mr. Lindsay says as he comforts Isaac. "I mean, Mrs. Lindsay and I didn\'t dance for two weeks."',
    '"Laurel?" Jennie asks, as she notices Laurel reaching into her tote bag.',
    '"I\'m listening," Laurel removes her pad and pen.',
    'Using her cafe shorthand, she jots:',
    'Ingredients—> Cafe —> Friends —> Coffee —> Delicious Treats—> Trivia—> Jukebox —>',
    'Laurel reveals her notes to the group.',
    'Mr. Lindsay offers, "All of these are the …"',
    '"Ingredients for the recipe for the Letter Griddle Cafe," Mrs. Lindsay adds.',
    '"Where one treat leads to another," Jennie confirms as she reads Laurel\'s shorthand.',
    '"Where one song on the jukebox leads to another," Mr. and Mrs. Lindsay concur as they read Laurel\'s notes.',
    '"Crew," Laurel shares, "we\'ve got another game for the Letter Griddle Cafe…just add one Jukebox!"'
  ],
  closing: 'Return next Sunday at 7pm for another peek into the Letter Griddle Cafe and Griddle Falls.',
  closingLink: '/jukebox',
  closingLinkText: 'Play Letter Griddle Jukebox now →'
},
{
    id: 'cafe-kerflufflegrid',
    title: 'Cafe Kerflufflegrid',
    subtitle: '🌀 Now Available',
    date: 'December 2025',
    locked: false,
    content: [
      '"Hey, Trivia Crew! Roads to the cafe are impassable. See you on Zoom at 7. 🌀 Password is Kerflufflegrid." Laurel reads the group text, then presses send.',
      'Responses soon follow:',
      '"Charged. ✨" - Taylor B.',
      '"See everyone in the Zoom grid! 😃" - Sarah',
      '"Testing \'kerflufflegrid.\' 🤓 Capital K, everyone!" - Mr. or Mrs. Lindsay',
      '"Thanks for the text! 🥰 Josie\'ll be there too! See you soon!" - Josephine',
      '"We have treats! Too bad we won\'t be able to share. 🍩" - Jennie',
      'Laurel, encouraged by the quick responses, tells herself, "Sent the text, crew texted back, password\'s ready. I\'ve got this!"',
      '"It\'s now or never…" Elvis wafts through the Bluetooth as Laurel turns off the coffee pot and puts away the cinnamon rolls.',
      '"Kerflufflegrid."',
      '"How perfect," she thought.',
      '"A game based on something being so close yet so far. Accessible but out of reach."',
      '"Kerflufflegrid."',
      'Laurel sings along, creating her own lyrics,',
      'Given the circumstances of the night',
      'Now or never',
      'and a game of Kerflufflegrid',
      'seem right.'
    ],
    closing: 'kerflufflegrid.com is always accessible, 24/7, now or whenever.',
    closingLink: 'https://kerflufflegrid.com',
    closingLinkText: 'Play Kerflufflegrid 🌀'
  },
  {
  id: 'new-year-retro-style',
  title: 'New Year, Retro Style',
  subtitle: '👟 Now Available',
  date: 'January 2026',
  locked: false,
  content: [
    'Sarah unmutes her microphone, "Laurel, you were going to ask us something special for our final question."',
    '"Laurel, you said we should jot down activities and styles enjoyed over the years that have been trendy," Jennie reminds, then muting, confirms with Isaac that he\'s always in style.',
    '"Crew, grab your notes!" Mr. and Mrs Lindsay unmute and chime in unison.',
    '"I\'ve been working on this one all day," Taylor B. enthusiastically shares.',
    '"Please mute your microphones so Laurel can ask us the question," Josephine gently persuades.',
    'Laurel grabs her notepad and reads, "Letter Griddle gamers, what\'s an item that you\'d like to see in style in 2026? Type your answers along with an emoji in the chat!"',
    'Noticing the crew members each holding up what looks to be their own extensively written lists, she adds, "Enter in the chat as many as you can in the next minute. Go!"',
    'The Zoom chat starts moving at a fast pace.',
    'Penny loafers!👞 Z-cars!🏎️ Flip phones!📱 Feathered hair💇‍♀️ Malt shops!🍨 Fidget spinners!😵‍💫 Roller skating!🛼 Saddle shoes👟 Taco Bell Chihuahua!🐾 Music stores!💿 Bell bottoms!🔔 Penny candy! 🍬🍭🍫',
    'Laurel pauses the feverishly scrolling chat, "Gamers, 10 seconds on the clock."',
    'The chat reopens and the fast-paced scroll continues.',
    'Actual cameras! 📸 Disco dancing!🕺 Fancy clothes!👗 Cool sunglasses!🕶️ Going camping! ⛺️ Hourglasses!⏳ Swimming lessons! 🤿 Naps! 💤 Real phones!📞',
    '"Three, two, one, ring-a-ding!"',
    '"Crew, you\'ve given this so much thought!" Laurel unmutes, as the crew members read the chat responses.',
    'Unmuting, Sarah asks, "Laurel, are the responses in the chat g-…"',
    '"Giving me an idea for another Letter Griddle game?" Laurel finishes.',
    '"Well, I always had a pair of saddle shoes," Josephine unmutes and shares.',
    '"You all know I still wear cool sunglasses," Taylor B. joins in the conversation.',
    '"We enjoy malts, all the years," Mr. Lindsay offers.',
    '"Remember, what is trendy today, can be vintage tomorrow," Mrs. Lindsay explains.',
    '"The Taco Bell chihuahua was a trend?" Jennie ponders as Isaac offers two yaps.',
    '"Crew, that concludes our Zoom trivia night. Let\'s put on our saddle shoes and meet at the malt shop!"'
  ],
  closing: 'Join us at Saddle Shoes for more malt shop memories.',
  closingLink: 'https://lettergriddle.com/saddleshoes',
  closingLinkText: 'Play Saddle Shoes 👟'
},
{
    id: 'the-usual',
    title: 'The Usual',
    subtitle: '☕ Cozy Anticipation',
    date: 'January 2026',
    locked: false,
    content: [
      'Awaiting the arrival of the trivia crew, Laurel plates the piping hot cinnamon rolls.',
'"Hello Laurel! We are a little earlier than expected, but we thought you might need a hand," the Lindsays say almost in unison, as they energetically enter the cafe. "What can we do to help?"',
      '"The usual. Until the trivia crew arrives. Thanks, guys!"',
      'Sipping from his favorite Letter Griddle mug, "Just the right temperature," Mr. Lindsay says on cue, as if he\'s talking to the coffee itself.',
      'Punching up her favorite numbers on Jukebox, "Sunday Jazz…" Mrs. Lindsay says as naturally as breathing, as she sways to the music.',
      '"The rest of the crew texted and they are all on their way for trivia night at the cafe."',
      'Savoring the ambiance of the cozy cafe and the anticipation of gathering with good friends, Laurel\'s words swirl into the sensory offerings of the Letter Griddle Cafe, as another pleasant layer of the moment.'
    ],
    closing: 'Friends, we hope you too will savor moments of anticipation.'
  },
  {
    id: 'cinnamon-hour',
    title: 'Cinnamon Hour',
    subtitle: '🥞 Spice Things Up',
    date: 'January 2026',
    locked: false,
    content: [
      '"Hey, everyone! 😀 Setting up the trivia station," Taylor texts the group wondering if anyone would even have time to read the message.',
      '"Hi, Taylor! ☕️ Cinnamon Hour is under control. We need an eight letter word for \'a popular winter spice from the inner bark of tropical trees,\' the revealed letter is an n," Mr. or Mrs. Lindsay responds.',
      '"We are here, too! 🎵  By Jukebox! 👋 Wave so we can find you!" Jennie texts, as Isaac quietly concurs.',
      '"See you soon,  🤔 still working on a five letter word with the hint \'aromatic substance used to flavor sweet or savory food! \'" Sarah shares.',
      '"Mom and Laurel are working on the cinnamon pancakes. 🥞 I\'m helping out with the coffee counter! 🤩 Come see me when you get to the cafe!"  Josie lets the group know.',
      'Taking off her Letter Griddle apron, Laurel pauses to gather her thoughts.',
      '✔️ Cinnamon pancakes. Thanks to Josephine\'s help.',
      '✔️ Coffee counter. Josie knows what to do.',
      '✔️ Music. Jennie knows music keeps Isaac from barking.',
      '✔️ Trivia station. Taylor ensures the technology is user-friendly.',
      '✔️ Working the room. The Lindsays know everyone at the Letter Griddle Cafe, and in Griddle Falls, for that matter.',
      'Putting on her trivia night emcee headset and mic, Laurel announces, "Cinnamon hour guests, enjoy your pancakes and coffee, and take a look at the trivia screen…let\'s see if we can solve this puzzle."'
    ],
    closing: 'Friends, it\'s Cinnamon Hour somewhere, so enjoy solving this puzzle.'
  },
  {
    id: 'tech-night',
    title: 'Tech Night',
    subtitle: '📱 One Tap Away',
    date: 'January 2026',
    locked: false,
    content: [
      '"Taylor, since you are THE techie we are leaning on you to make our lives easier," Sarah asserts.',
      '"We enjoy all of the daily digital Letter Griddle games, but keeping track of them…." Jennie\'s voice trails off.',
      '"Woof!" Isaac concurs as he sniffs out his next treat.',
      'Confidently Taylor offers, "Crew, since we all agree that Laurel\'s \'Orange You Surprised It\'s For Brunch?\' is our favorite vitamin-C packed treat from the cafe\'s kitchen, I designed the new Letter Griddle app-like icon to resemble an….."',
      '"Orange!" 🟠 the crew erupts in trivia style.',
      '"Crew, you are as tech-savvy as you are treat-savvy!" Taylor says, knowing his audience.',
      '"Taylor, enough with telling! Show us!" Mrs. Lindsay eagerly insists.',
      'Taylor is enjoying the group\'s enthusiasm!',
      '"Now if I may direct your attention to lettergriddle.com/play, also known as \'your favorite pancake-inspired daily word game.\'"',
      'The crew members, devices in hand, go to Safari and type in their browser lettergriddle.com/play just as Taylor mentions.',
      '"Now, friends, devices down, eyes up here at the trivia screen, in 3, 2, 1," Taylor directs.',
      'The eager group of trivia buffs, word game enthusiasts, and treat connoisseurs follows directions as Taylor projects the Letter Griddle game from his own device, and calls attention to the help circle.',
      '"Click the help circle for instructions about adding the Letter Griddle icon to your Home Screen. Once it\'s there, you can access your game from the icon rather than your browser or bookmark."',
      'Taylor continues, "Once the Letter Griddle icon is added to your home screen, your favorite daily pancake-inspired word game will be one tap away!"',
      '"One tap away?! I\'m all for that, Taylor! Continue!" Mrs. Lindsay\'s enthusiasm for this encourages Taylor to continue.',
      'Taylor goes on with tech night, "Let\'s read over this info together so that questions can be answered."',
      'Add to Your Home Screen! Play Letter Griddle like an app! Add it to your phone\'s Home Screen for easy one-tap access every day. iPhone/iPad: In Safari, tap the Share button (square with arrow) → "Add to Home Screen" Android: In Chrome, tap the three dots menu → "Add to Home Screen" You\'ll see our orange Letter Griddle icon on your Home Screen! 🟠',
      '"I can easily share with the cafe regulars how to add the Letter Griddle icon to their home screens too," Laurel offers.',
      'Sarah wisely reminds the group, "As always Taylor\'s Pro-tip: Reread the directions as many times as you\'d like!"',
      'Taylor reminds the group, "Yes, Sarah! Thanks! This is important to note: Adding Letter Griddle to your Home Screen starts fresh stats. Your stats will save within the app going forward! As always, if you have questions about this process of adding the Letter Griddle app-like icon to your home screen, reach out at lettergriddle@gmail.com or on Instagram @letter_griddle."',
      '"Thanks, Taylor! Right on time, it\'s 7:00 pm EST! Tech night is concluded," Laurel says as she takes over as emcee.',
      'The crew, devices in hand, seem happy and content with the tech night\'s events and the group shifts into Letter Griddle game mode.',
      '"…\'Pie\'…an eight-letter word for \'a fluffy topping made from whipped egg whites and sugar,\'" Mr. Lindsay says to himself.',
      '"Woof!" Isaac responds.'
    ],
    closing: 'Friends, please note: adding Letter Griddle to your Home Screen starts fresh stats. Your stats will save within the app going forward!'
  },
  {
    id: 'winter-olympics',
    title: 'Winter Olympics Trivia',
    subtitle: '🏅 Going for Gold',
    date: 'February 2026',
    locked: false,
    content: [
      '"Thanks again everyone for helping at the Winter Festival today. Tonight\'s trivia theme naturally is the Winter Olympics! Who knows the dates of the 2026 winter games and locations? First to respond gets an extra pancake added to their stack!" Laurel reads over her text before sending it to the trivia crew.',
      '"This teaser should get the group thinking about the 2026 Winter Olympics," Laurel says to Taylor B. as he gets the tech set up for the night.',
      'The bell on the cafe door grabs their attention before the energetic voice, "February 6th through February 22nd are the dates of the winter games. We were just dropping off Isaac at Jennie\'s when we thought we\'d all head over to the cafe to see what we could do to help prepare," Mr. Lindsay explains on behalf of Mrs. Lindsay, Jennie, and Isaac.',
      '"Isaac is a handsome fellow and wanted to show you his grooming session was a success!" Jennie explains.',
      'Mrs. Lindsay offers, "It\'s our pleasure to keep your furry friend in tip-top shape. Our \'Lending a Paw\' mobile dog care business is our pride and joy since Mr. Lindsay and I have retired from teaching. And did I mention that this year\'s games are in Milan and Cortina, Italy? It is the first Winter Games to be officially hosted by two cities."',
      '"Thanks, Mr. Lindsay, Mrs. Lindsay. Correct as usual. And glad you\'re here a bit early.  We could use some help with reading over tonight\'s Winter Olympics questions," Taylor says.',
      'Laurel adds, "If you all could make sure the questions and the tech are in sync for tonight and no, Mr. Lindsay we\'re not giving you the correct answers so that you can debate with your extensive knowledge of geography and history. We know you are smart."',
      '"I just want to be sure…" Mr. Lindsay starts.',
      '"That you\'re the smartest in the room?" Laurel jokes. "Anyway go ahead and start reading over the questions while Taylor makes sure the tech is cooperating and I\'ll go get those pancakes."',
      '"Let me know if there\'s anything that needs correcting before game time tonight," Taylor says.',
      '"Okay I\'ll read the first question," Jennie offers. "All the events at the Winter Olympics take place in blank and blank."',
      '"I can\'t wait to answer that question tonight!" Mrs. Lindsay says. "The next question asks, \'What year—?\'"',
      '"Letter Griddle pancakes are only hot once!" Laurel announces.',
      '"We\'ll be back, Taylor!" Mr. Lindsay promises, as the group scurries to their corner booth in the cafe.',
      'Taylor pauses the sound board, and asks the now empty trivia room, "What cafe holds the record for the gold medal every Sunday in the pancake competition?"',
      'Before removing his headset, Taylor\'s amplified voice fills the cafe, "Hey, wait for me!"'
    ],
    closing: 'Friends, go for the gold and enjoy this puzzle!'
  },
  {
  id: 'hoopla-pancakes-winter-olympics',
  title: 'Hoopla, Pancakes, and the Winter Olympics',
  subtitle: '🥇 Now Available',
  date: 'February 2026',
  locked: false,
  content: [
    'As 7:00 nears, Laurel makes sure the cafe is prepared for the Hoopla Pep Rally Trivia night.',
    'The cafe\'s beautiful granite countertop shines like a beacon to coffee lovers. Each booth has its own small vanilla scented votive candle lit. The hardwood floors creak in familiar footworn patterns as Laurel gives the cafe a twice-over.',
    'Jukebox plays the familiar instrumental jazz that no one seems to notice until the music stops.',
    'Laurel knows how each guest will greet the group as they arrive, where each player will sit, the topics that will make experts out of mere mortals, and how they take their coffee and top their pancakes.',
    'Mr. Lindsay energetically enters the cafe. "I don\'t know what my nose likes best, fresh-brewed coffee or cinnamon rolls."',
    '"Sorry, we\'re late. We got caught up working on our taxes," Mrs. Lindsay offers.',
    '"You\'re fashionably early," Laurel says with a laugh.',
    '"Perfectly early! Come take a look at the Hoopla screen!" Taylor B. persuades as he emerges from the tech area.',
    '"Tomorrow, let\'s work on taxes, tonight let\'s party with pancakes, pastries, and the Winter Olympics!" Sarah interjects as she brings a plate of fresh cinnamon rolls out.',
    '"Tonight, Hoopla. Tomorrow, taxes!" Jennie offers entering from the cafe\'s side door with Isaac.',
    '"My vote is we do both here at the Letter Griddle Cafe!" Josephine offers peeking around the high-backed corner booth.',
    '"Trivia tonight. I will pencil in taxes tomorrow! Got it!" Laurel schedules the group\'s meeting.',
    '"It will be a taxes pep rally!" Mr. Lindsay gets excited about group activities.',
    'Laurel proudly knows that Sunday trivia nights are part of the heritage of Griddle Falls established traditions. Adding "taxes" to the cafe\'s activities is a natural evolution.'
  ],
  closing: 'Friends, pencil in some fun and go for the gold!',
  closingLink: 'https://lettergriddle.com/hoopla',
  closingLinkText: 'Play Hoopla 🥇'
},
{
  id: 'orange-you-surprised',
  title: 'Surprised',
  subtitle: '🍊 Now Available',
  date: 'February 2026',
  locked: false,
  content: [
    '"Intermittent rain throughout Sunday evening…" the weather forecaster reads.',
    '"We\'ll bring our umbrella," the group text from the Lindsay duo grabs Laurel\'s attention from the television to her phone.',
    '"Hm, the group is going to need a boost of sunshine amid the gloomy weather to answer tonight\'s trivia questions," Laurel ponders.',
    'Thinking on her feet, "Hey, crew, I\'ve got a special favor to ask. Need these ingredients. Please bring whatever you have with you to the cafe for trivia," Laurel sends the text, knowing that the crew will come through.',
    '"1 box 3 oz of orange gelatin, 1 box 3.4 oz instant vanilla pudding, 1 tub 8 oz whipped topping, 2-15 oz cans mandarin oranges drained, 1 tbsp orange zest"',
    '"Laurel, I have a box of orange gelatin that I will bring, but this sounds a little mysterious… the weather, the request for ingredients, the unknown…," Josephine responds.',
    '"Sounds delicious whatever this surprise is! I\'ve got the box of vanilla pudding packed in my tote bag already!" Sarah replies.',
    '"Whipped topping, check!" Jennie informs the group.',
    '"I\'ve got a navel orange to bring to add to the zest! See what I did there?" Taylor B. jokes.',
    '"Two umbrellas and two cans of mandarin oranges are ready for trivia night!" Mr. Lindsay or Mrs. Lindsay message.',
    '"Orange 🍊 you all the best trivia crew in Griddle Falls!?" Laurel texts the group in anticipation of another Sunday gathering at the Letter Griddle Cafe.'
  ],
  closing: 'Friends, the recipe for deliciousness Laurel\'s whipping up is found at lettergriddlecookbook.com',
  closingLink: 'https://lettergriddlecookbook.com',
  closingLinkText: 'Visit the Cookbook 🍊'
},
{
  id: 'new-new-new',
  title: 'New, New, New',
  subtitle: '☕ Now Available',
  date: 'February 2026',
  locked: false,
  content: [
    '"Is anyone surprised that this is delicious?" Sarah asked as the crew was enjoying the orange dessert each of them contributed an ingredient to creating.',
    '"Laurel, is there enough for a to-go order to have for a mid-morning treat at home tomorrow?" Josie eagerly asked.',
    '"Let\'s meet back here tomorrow morning around 11:00 and we can all try the dessert as a brunch treat!" Mr. Lindsay generously offered. "We certainly have enough granola for the crew!"',
    '"We can all try it together! Even better!" said Mrs. Lindsay.',
    '"I\'ve got some vanilla Greek yogurt that would be delicious added to the orange dessert topped with granola! The yogurt is buy-one-get-one at the store this week, so I doubled up. I have enough for the entire trivia crew!" Jennie added.',
    '"What will our brunch activities be?" Josephine wondered. "We could try the Espresso Lane games or we can…"',
    '"Espresso Lane gets my vote!" Taylor hopped in, then added, "I\'ve got to do a tech check on those six new games. Tomorrow will be the perfect opportunity with the crew to play Espresso Lane games."',
    '"New games, new brunch treat, new meeting day and time!" Laurel recapped the conversation, reviewing the exciting offerings found at Letter Griddle Cafe.'
  ],
  closing: 'Friends, whether you\'re enjoying brunch, a coffee break, or chilling with the original Letter Griddle, savor the moment with the coffee-inspired Espresso Lane games. Find Glow, Sizzle, Top That!, Lattes, Order Up!, and To-Go at lettergriddle.com.',
  closingLink: 'https://lettergriddle.com',
  closingLinkText: 'Play Espresso Lane ☕'
},
{
  id: 'top-that',
  title: 'Top That',
  subtitle: '🍳 Now Available',
  date: 'March 2026',
  locked: false,
  content: [
    '"Laurel is good but she can\'t top…" Taylor teases.',
    '"Orange dessert with a brunch twist of yogurt and granola? For sure, it\'s on the list of new favorites," Josie declares. "Mom, let\'s make it at home!"',
    '"Where has that orange delight been all my life?" Josephine ponders.',
    '"We\'ll have it again but not before we try the new and improved breakfast casserole!" Laurel promises. "Cheddar cheese, not from a bag, but freshly grated by your great cafe owner."',
    '"Laurel, you shouldn\'t tease us like that," Mr. Lindsay playfully chides.',
    '"The casserole has been sitting for nearly half an hour, so it\'s still pretty hot, but I\'m excited for us all to try it," Laurel explains.',
    '"You had us at cheese," Sarah speaks for the group.',
    '"I\'ve also used kosher salt that I\'ve been using in the cafe kitchen for the last week or so…that\'s going to be interesting flavor-wise," Laurel shares.',
    '"If by interesting you mean delicious, we are here for it. Aren\'t we Josie?" Josephine offers.',
    '"Last time we had a cold treat, today we will feast on a hotdish!" Josie eagerly responds to her mother.',
    'As she comes into the dining area from the kitchen, Mrs. Lindsay announces, "The orange juice is freshly poured and ready!"'
  ],
  closing: 'Friends, remember: a glass of orange juice is the perfect complement to the breakfast casserole. Breakfast casserole tips: use half a tsp of kosher salt; a cup of freshly grated cheese is good but 12 oz might be better; use a very crusty dried out baguette. Visit lettergriddlecookbook.com for more delicious recipes, tips, and fun Letter Griddle puzzles!',
  closingLink: 'https://lettergriddlecookbook.com',
  closingLinkText: 'Visit the Cookbook 🍳'
},
{
  id: 'food-for-thought',
  title: 'Food For Thought',
  subtitle: '📒 Now Available',
  date: 'March 2026',
  locked: false,
  content: [
    '"The crew will be here any minute," Laurel ponders as she pulls out the ledger of Letter Griddle\'s annual top ten night.',
    'The well-used leather bound ledger used to record the annual top ten suggestions was showing its age. Coffee rings, cinnamon bun crumbs, and syrup splatters, mementos of previous years\' Top Ten nights didn\'t seem to interfere with Laurel\'s perusal of the previous years\' contenders.',
    '"No pressure, no rush." Mr. Lindsay interjects as he enters the cafe. "Letter Griddle\'s good vibes are a winner!"',
    '"Yes! Good vibes all around!" Mrs. Lindsay concurs then adds, "No ad to watch or subscription, just play…for free!"',
    '"For me it\'s the hum of the tech station.  No doubt." Taylor\'s voice is heard throughout the cafe\'s PA system.',
    '"Yap, yap, yap, yap!" Isaac bolts through the cafe door as Jennie runs through the cafe after him.',
    '"For us, we like that the whole family can play!" Jennie shares as she whizzes through the room chasing her pooch.',
    'Laurel cradles the open ledger and announces, "The coffee is hot, the cinnamon buns are warm, and the ledger is open. And so begins our annual Letter Griddle Top Ten."'
  ],
  closing: 'Friends, Letter Griddle is just the beginning. A whole family of games is waiting for you at lettergriddle.com.',
  closingLink: 'https://lettergriddle.com',
  closingLinkText: 'Play Letter Griddle'
},
{
  id: 'stay-for-the-vibe',
  title: 'Stay for the Vibe',
  subtitle: '✨ Now Available',
  date: 'March 2026',
  locked: false,
  content: [
    '"People don\'t just play!"  Josie adds, skipping behind Jennie who\'s still chasing Issac through the cafe. "They visit."',
    '"I have to agree with Josie," offers Josephine, trailing into the cafe after her daughter.  "We play the game, then visit the cookbook to see what\'s cooking. Sorry Josie and I are late.  What did we miss?  What is cooking?"',
    '"Our annual Top Ten night is heating up," Laurel announces, attempting to focus the group.',
    '"You know they say, \'Come for the pancakes and coffee. Stay for the tea\'? Let\'s add \'vibe\' to that hook,"  Taylor again drops his input over the cafe PA.',
    'Looking up at the speaker, "Taylor, you\'re way too cozy in that cafe tech station, but if by \'vibe\' you mean vignettes with us as the characters, trivia nights, and.." Mrs. Lindsay starts.',
    '"Sparking connections with a fresh puzzle at 7 PM,"  Mr. Lindsay completes Mrs. Lindsay\'s thought.',
    '"Yes, it really fits into our routine, without taking over," Josephine shares.  "We Letter Griddle after dinner."',
    '"Letter Griddle is a verb now!"  Sarah interjects.',
    '"Okay, so one puzzle a day is…" Laurel rephrases the thought to focus the crew.',
    '"Totally doable!"  Sarah gladly offers.  "Laurel, add that to the ledger!"',
    '"Woo-hoo!  Yes! Bravo, bravo! Huzzah!" the crew responds favorably.',
    '"Backed by the cheers of the crew \'One puzzle a day is doable\' earns its place in the ledger," Laurel announces as she writes the entry.'
  ],
  closing: 'Friends, the vibe is yours to choose: one puzzle a day at lettergriddle.com/play or choose from a palette of puzzles at lettergriddle.com.',
  closingLink: 'https://lettergriddle.com/play',
  closingLinkText: 'Play Letter Griddle ✨'
},
{
  id: 'st-patricks-day-scavenger-hunt',
  title: 'The Scavenger Hunt',
  subtitle: '☘️ 2026 Edition',
  date: 'March 2026',
  locked: false,
  content: [
    '"The Letter Griddle Annual St. Patrick\'s Day Scavenger Hunt 2026 edition is set to begin any moment…" Laurel announces.',
    '"Everyone have their sneakers on? You remember how much ground we covered last year!" Sarah asks the group.',
    '"My dogs were barking, and I\'m not referring to our Lending a Paw clients," Mr. Lindsay shares.',
    '"Yap, yap!" Isaac is heard before he\'s seen.',
    '"Happy St. Patrick\'s Day, everyone! Are we late?" Jennie asks, with Isaac at her heels, who soon finds his way into Mrs. Lindsay\'s arms.',
    '"Happy St. Patrick\'s Day to you," Mrs. Lindsay replies affectionately, with Isaac being the you.',
    '"Oh my goodness, you both look fab! Did you knit matching sweaters?" Sarah asks, admiring the green cardigan vests Jennie and Isaac are wearing.',
    '…Ping! Whoosh! Clink!…',
    '"Taylor has texted the official list!" Laurel announces.',
    'Taylor\'s text reads: "As loyal members of the trivia crew, your participation in the annual scavenger hunt is of the utmost importance. You and another crew member have exactly 17 minutes to find and collect the following items."',
    'Sarah reads, "The first item is ⭐️ 1 star."',
    'Jennie takes a turn: "The next item is 🫖 1 teapot."',
    'Mrs. Lindsay, still cradling Isaac, reads, "☘️ 1 clover."',
    'Mr. Lindsay eagerly reads, "Okay, this one will be easy. You know I never met a stranger. 🗒️ 1 lucky message, which can be a text, a note, or a greeting from anyone. Present company excluded."',
    'Laurel reads the last item: "🟢 A green treat, and there\'s a bonus this year."',
    '"Bonus points are earned if there\'s enough of the green treat to share!" Taylor\'s voice booms through the cafe PA system.',
    '"I didn\'t know the PA system worked out here on the sidewalk too," Sarah says in amazement.',
    '"Crew, 17 minutes are on the clock. May the luck of the Irish be with you! That\'s the green light to go. See what I did there?" With that, Taylor officially starts the hunt.',
  ],
  closing: 'Friends, sneakers or no sneakers, many of the items on this list can be found at lettergriddle.com/maze. And if you find a green treat, it\'s always nice to share. 🍀 Happy St. Patrick\'s Day! 🍀',
  closingLink: 'https://lettergriddle.com/maze',
  closingLinkText: 'Play Maze at lettergriddle.com →'
},
{
  id: 'a-scrapbook',
  title: 'A Scrapbook',
  subtitle: '📔 Now Available',
  date: 'March 2026',
  locked: false,
  content: [
    '"We\'ve entered \'A puzzle a day is totally doable\' as a top ten favorite, now let\'s add to the scrapbook pages of that old tome," Mr. Lindsay suggests.',
    'Laurel fumbles with the leather-bound ledger as she locates its scrapbook pages.',
    '"I\'ve got it! Let\'s add the items to the album from the scavenger hunt to commemorate 2026\'s adventures," Mrs. Lindsay offers.',
    'Its pages sticking from previous years\' syrup splatters, Laurel awkwardly juggles both the book and the Lindsays\' eager suggestions.',
    'The luxury of a momentary pause to reflect on mementos from years past is soon interrupted.',
    'Click, click, tap, ping! 📱',
    '"Check your phones, everyone," Jennie tells the crew.',
    '"Precious," chime the Lindsays, upon immediately grabbing their phone.',
    '"I vote for this selfie photo of Isaac and Jennie sporting their green hand-knitted sweaters finding its rightful place as a Letter Griddle memory," Sarah suggests.',
    '"Of course, we will not pass green until we do! See what I did there?" Taylor remarks, impressing himself.',
    'Locating the coffee-splattered journal page from last year, Laurel projects the image using the trivia tech setup.',
    '"Look at how much Isaac has grown since last year," Jennie lovingly notes, glancing back and forth at last year\'s snap and her fur BFF on her lap.',
    '"Look at how much Letter Griddle has grown in a year!" Sarah marvels.',
    '"Games," Mr. Lindsay instinctively shouts.',
    '"Puzzles," Mrs. Lindsay adds.',
    '"Fun facts," Sarah offers.',
    '"Tech capabilities," Taylor proudly shares.',
    '"Crew, we\'ve all grown in our fun, friendship, good times, and knowledge in the past year," Laurel shares, offering her perspective. "This scrapbook proves it!"',
  ],
  closing: 'Friends, enjoy collecting in your own scrapbook at lettergriddle.com/play as a way for you to capture the fun and good times you\'ve had in a year with your favorite pancake-inspired word game. 📔 Find your Letter Griddle Scrapbook 📔 next to our new night mode toggle 🌙 at lettergriddle.com/play.',
  closingLink: 'https://lettergriddle.com/play',
  closingLinkText: 'Find your Scrapbook at lettergriddle.com/play 📔'
},
{
  id: 'top-ten-toast',
  title: 'Top Ten Toast',
  subtitle: '☕ Now Available',
  date: 'March 2026',
  locked: false,
  content: [
    '"Everyone, have your mug?" Laurel asks, lifting her Letter Griddle coffee cup.',
    'The crew follows Laurel\'s lead, raising their mugs as if choreographed.',
    'Clink, clink, clink.',
    'Taylor emerges from the tech station, mug in hand, to join in the toast.',
    '"To the \'doable\' daily puzzle," Mr. Lindsay toasts, eyes a-twinkle.',
    '"To the syrup splatters and the sticky pages in that historic book," Mrs. Lindsay adds, fidgeting with something gooey.',
    '"To being more than just players, to being a crew, to lending a paw," Jennie says, looking around at each of the crew, then at Isaac.',
    '"And to more fun \'Letter Griddling\' together!" Sarah cheers.',
    'The Letter Griddle friends sip their coffee to the memories already saved, the puzzles yet to be solved, recipes yet to be prepared, and adventures to be experienced.',
  ],
  closing: 'Friends, to you and your doable daily puzzle. lettergriddle.com/play',
  closingLink: 'https://lettergriddle.com/play',
  closingLinkText: 'Play your doable daily puzzle ☕'
},
{
  id: 'the-cafe-has-an-almanac',
  title: 'The Cafe Has an Almanac',
  subtitle: '📔 Now Available',
  date: 'April 2026',
  locked: false,
  content: [
    '"What\'s this?" Josie asks as she struggles to pull an identical leather-bound tome off the cafe shelf.',
    '"The cafe almanac!" Mrs. Lindsay says.',
    '"We need to update that too!" Mr. Lindsay chimes in.',
    '"Looks like the last time we opened this old tome was in 2023 to update the cafe\'s moments in time," Taylor notices.',
    '"2024, okay who remembers…" Laurel starts.',
    '"What was all the rage at the cafe in 2024?" Jennie asks.',
    '"Remember, mushroom coffee was in everyone\'s to-go cup until the next year when …," Laurel shares, "the next year had me learning recipes for pistachio lattes."',
    '"We just celebrated the wins at the 2026 Winter Olympics in Milan and Cortina d\'Ampezzo, but remember the Paris Olympics captivated the cafe and the world in summer 2024!" Mr. Lindsay offers.',
    'Isaac provides an energetic "yap, yap" along with two tail wiggles, as if to prepare the room for Jennie to add, "The Paris Olympics were the stage where Simone Biles returned triumphantly!"',
    '"We were at the cafe for every event during the Paris Summer Olympics," Mr. Lindsay reflects.',
    '"Every day, here, sipping coffee and even trying the mushroom coffee Laurel was serving the to-go group," Mrs. Lindsay recollects.',
    '"Good times and good thing I hung on to those cool retro sunglasses because last year\'s nostalgia for the early 2000s hit like a beam of sunshine," Taylor says as he adjusts his sunglasses. "But 2024 to me was all about tech, the other Taylor\'s Eras tour, and Oppenheimer. Even though Oppenheimer was released in 2023, the obsession was fully rooted in 2024."',
    '"Cool shades, Taylor, and music and movie choices," Sarah says, "but 2024 for me was a big year for books and reading. I know it\'s not everyone\'s cup of mushroom coffee, but that was the year I developed an appreciation for romantasy as a go-to genre."',
    '"Sarah, you loaned me some of your books. I haven\'t stopped reading since," Josephine shares. "If anyone wants to borrow any books, I have since acquired my own copies, paperbacks and ebooks."',
    'Josie shares, "Mom said the themes were too mature for me to read, so I drew a lot of cute dragon pictures that summer instead."',
    '"I also remember…." Josephine starts.',
    '"…asking about Kendrick Lamar and Drake\'s argument around that time," Josie interjects.',
    '"Not the direction I was going," Josephine clarifies. "I was going to say…"',
    '"Mom, you said it wasn\'t any of my business," Josie softly adds.',
    '"I encouraged you to color those cute dragon drawings, write your own stories, and to read about fashion trends to get you ready for school," Josephine adds.',
    '"Ballet flats for the win!" Josie stands and points at her feet.',
    '"I think Josie still has a pair for each day of the school week," Josephine tells the group.',
    '"Listen to us share. Each of us having our own unique memories," Laurel remarks. "So much important history happened in 2024."',
    '"Let\'s add all of this wonderful recollection to the pages of the cafe almanac," Mrs. Lindsay says.',
    '"Now, who remembers 2025?" asks Taylor, dramatically removing his sunglasses.',
    '"Taking orders for pistachio lattes!" Laurel offers.',
  ],
  closing: 'Friends, join us here to read the next entry in the cafe almanac, "2025: Retro Vibes and Pistachio Lattes."',
  closingLink: 'https://lettergriddlecafe.com',
  closingLinkText: 'Return to the Cafe 📔'
},
];

// Puzzle data - expandable for future puzzles
const puzzles = {
  'trivia-night': {
    id: 'sunday-night',
    title: 'Sunday Night',
    category: 'Cafe Life',
    words: ['CAFE', 'TRIVIA', 'COFFEE', 'JUKEBOX', 'PANCAKES'],
    hints: ['Where friends gather', 'Sunday night game', 'Hot morning brew', 'Plays ambient tunes', 'Griddle favorites'],
    revealed: [
      { pos: 1, letter: 'A' },
      { pos: 2, letter: 'I' },
      { pos: 0, letter: 'C' },
      { pos: 4, letter: 'B' },
      { pos: 3, letter: 'C' }
    ],
    didYouKnow: 'The tradition of cafe culture dates back to the 1600s when coffeehouses became gathering places for conversation, news, and community. They were called "penny universities" because for the price of a coffee, you could engage in stimulating conversation and learn from others.'
  },
  'coffee-coffee-coffee': {
    id: 'cafe',
    title: 'Cafe',
    category: 'Cafe Life',
    words: ['MENU', 'SHARE', 'FRIEND', 'NOURISH', 'INTERACT'],
    hints: ['List of offerings', 'Give to others', 'Companion', 'Feed and nurture', 'Engage with others'],
    revealed: [
      { pos: 0, letter: 'M' },
      { pos: 2, letter: 'A' },
      { pos: 0, letter: 'F' },
      { pos: 4, letter: 'I' },
      { pos: 6, letter: 'C' }
    ],
    didYouKnow: 'The word "cafe" comes from the French café, meaning "coffee," which itself derives from the Italian caffè, ultimately tracing back through Ottoman Turkish kahve to the Arabic qahwa, which originally referred to a type of wine but was transferred to coffee due to its stimulating effect.'
  },
  'add-one-jukebox': {
    id: 'jukebox',
    title: 'Jukebox',
    category: 'Jukebox',
    words: ['TUNE', 'BLUES', 'VARIETY', 'COUNTRY', 'RECORDED'],
    hints: ['A melody', 'Sad music genre', 'Wide selection', 'Rural music style', 'Captured on tape'],
    revealed: [
      { pos: 0, letter: 'T' },
      { pos: 2, letter: 'U' },
      { pos: 0, letter: 'V' },
      { pos: 3, letter: 'N' },
      { pos: 2, letter: 'C' }
    ],
    didYouKnow: 'Jukeboxes started as nickel-in-slot phonographs in 1889, evolving from early recording devices. The name "jukebox" comes from "juke joints" where people danced to them in the 1930s. They helped revive the music industry during the Depression and offered a wide variety of music for soldiers during WWII.'
  },
  'cafe-kerflufflegrid': {
    id: 'kerflufflegrid',
    title: 'Kerflufflegrid',
    category: 'Kerflufflegrid',
    words: ['ZOOM', 'ELVIS', 'TREATS', 'CHARGED', 'PASSWORD'],
    hints: ['How the trivia crew connected when they couldn\'t meet in person', '"It\'s now or never" singer wafting through Laurel\'s Bluetooth', 'Jennie\'s box of goodies she couldn\'t share 🍩', 'Taylor B.\'s one-word response ✨', 'Kerflufflegrid was this for the virtual trivia night'],
    revealed: [
      { pos: 2, letter: 'O' },
      { pos: 2, letter: 'V' },
      { pos: 3, letter: 'A' },
      { pos: 2, letter: 'A' },
      { pos: 3, letter: 'S' }
    ],
    didYouKnow: 'Elvis Presley\'s "It\'s Now or Never" was based on the Italian song "O Sole Mio" and became one of his best-selling singles, reaching #1 in multiple countries in 1960.'
  },
  'new-year-retro-style': {
  id: 'retro-style',
  title: 'Retro Style',
  category: 'Retro Style',
  words: ['MALT', 'PHONE', 'SADDLE', 'VINTAGE', 'REMEMBER'],
  hints: [
    'Mr. Lindsay\'s favorite sip at the shop',
    '"Real" or "flip," the crew wants them back! 📱',
    'Josephine\'s classic two-tone footwear',
    'Style from years past, now trendy again',
    'What the crew does when sharing retro favorites'
  ],
  revealed: [
    { pos: 1, letter: 'A' },
    { pos: 2, letter: 'O' },
    { pos: 2, letter: 'D' },
    { pos: 2, letter: 'N' },
    { pos: 2, letter: 'M' }
  ],
  didYouKnow: 'Saddle shoes were invented in 1906 as "gym oxfords" for indoor sports. By the 1930s, they became everyday student wear, perfect for trips to the malt shop, those iconic 1940s-60s teen hangouts known for jukeboxes, spinning stools, and malted milkshakes!'
},'the-usual': {
    id: 'the-usual',
    title: 'Anticipation',
    category: 'Anticipation',
    words: ['HOPE', 'SAVOR', 'EXPECT', 'MOMENT', 'AWAITING'],
    hints: ['Optimistic feeling for the future', 'To enjoy something slowly and fully', 'To look forward to something', 'A point in time', 'Patiently staying for something to arrive'],
    revealed: [
      { pos: 0, letter: 'H' },
      { pos: 2, letter: 'V' },
      { pos: 3, letter: 'E' },
      { pos: 0, letter: 'M' },
      { pos: 4, letter: 'T' }
    ],
    didYouKnow: 'Anticipating something fun triggers your brain to release dopamine, creating "anticipatory joy." Studies show this waiting period can sometimes feel more pleasurable than the event itself. Your mind replays positive scenarios, turning the buildup into a bonus reward!'
  },
  'cinnamon-hour': {
    id: 'cinnamon-hour',
    title: 'Spice',
    category: 'Spice',
    words: ['BARK', 'SWEET', 'SAVORY', 'PANCAKE', 'CINNAMON'],
    hints: ['Outer layer of a tree', 'Sugary taste', 'Salty or spicy, not sweet', 'Griddle breakfast favorite', 'Popular winter spice from tropical tree bark'],
    revealed: [
      { pos: 0, letter: 'B' },
      { pos: 1, letter: 'W' },
      { pos: 2, letter: 'V' },
      { pos: 2, letter: 'N' },
      { pos: 3, letter: 'N' }
    ],
    didYouKnow: 'Cinnamon is known for boosting brain activity and its antioxidant properties. It enhances both sweet and savory dishes. Those rolled sticks? They\'re called quills!'
  },'tech-night': {
    id: 'tech-night',
    title: 'Home Screen',
    category: 'Home Screen',
    words: ['ICON', 'SHARE', 'ORANGE', 'DESKTOP', 'MERINGUE'],
    hints: [
      'A small image representing an app or program',
      'To give others access or distribute content',
      'A citrus fruit or its color',
      'The main screen of a computer where icons are displayed',
      'A fluffy topping made from whipped egg whites and sugar'
    ],
    revealed: [
      { pos: 0, letter: 'I' },
      { pos: 2, letter: 'A' },
      { pos: 0, letter: 'O' },
      { pos: 3, letter: 'K' },
      { pos: 4, letter: 'N' }
    ],
    didYouKnow: 'Using the Home Screen Letter Griddle app-like icon will make your day 99.99%* more fun! *Your mileage may vary.'
  },
  'winter-olympics': {
    id: 'winter-olympics',
    title: 'Winter Olympics',
    category: 'Winter Olympics',
    words: ['ICE', 'SNOW', 'MEDAL', 'RECORD', 'HISTORY'],
    hints: [
      'Frozen water used for skating and hockey',
      'White precipitation essential for skiing events',
      'Award given to top three finishers',
      'A best-ever achievement in a sport',
      'The story of past events over time'
    ],
    revealed: [
      { pos: 0, letter: 'I' },
      { pos: 1, letter: 'N' },
      { pos: 2, letter: 'D' },
      { pos: 3, letter: 'O' },
      { pos: 4, letter: 'O' }
    ],
    didYouKnow: 'The first Winter Olympics were held in 1924 in Chamonix, France, but were originally branded as an "International Winter Sports Week."  No Southern Hemisphere country has ever hosted the Winter Games.  Norway holds the record for the most total medals won in Winter Olympic history.'
  },
  'hoopla-pancakes-winter-olympics': {
  id: 'pep-rally',
  title: 'Pep Rally',
  category: 'Pep Rally',
  words: ['JAZZ', 'TAXES', 'HOOPLA', 'OLYMPIC', 'PASTRIES'],
  hints: [
    'Jukebox\'s familiar instrumental genre',
    'Tomorrow\'s pep rally topic!',
    'Tonight\'s trivia game on Taylor B.\'s screen',
    'Winter games to party with pancakes and pastries',
    'Cinnamon rolls and other sweet treats'
  ],
  revealed: [
    { pos: 2, letter: 'Z' },
    { pos: 2, letter: 'X' },
    { pos: 1, letter: 'O' },
    { pos: 3, letter: 'M' },
    { pos: 2, letter: 'S' }
  ],
  didYouKnow: 'The term "pep rally" dates back to at least 1915, with "pep" meaning vigor and energy, originating from "pepper" in the early 1900s.'
},
'orange-you-surprised': {
  id: 'oranges',
  title: 'Oranges',
  category: 'Oranges',
  words: ['PEEL', 'JUICE', 'CITRUS', 'VITAMIN', 'FRAGRANT'],
  hints: [
    'Remove the skin',
    'Squeeze for this liquid',
    'Orange, lemon, and lime family',
    'C is found in oranges',
    'Sweet-smelling aroma'
  ],
  revealed: [
    { pos: 2, letter: 'E' },
    { pos: 0, letter: 'J' },
    { pos: 0, letter: 'C' },
    { pos: 3, letter: 'A' },
    { pos: 4, letter: 'R' }
  ],
  didYouKnow: 'In ancient Greece, oranges were prized as food from the gods and were called "golden apples." They were also a prized fruit of the Chinese emperors. In one Chinese dialect, the word for "orange" means "gold."'
},
'new-new-new': {
  id: 'new-new-new',
  title: 'New, New, New',
  category: 'New, New, New',
  words: ['TECH', 'LETTER', 'YOGURT', 'GRANOLA', 'ESPRESSO'],
  hints: [
    'Taylor\'s check on the new games',
    'Griddle\'s first name',
    'Jennie\'s buy-one-get-one find',
    'Crunchy brunch topping',
    'Coffee-inspired game lane'
  ],
  revealed: [
    { pos: 0, letter: 'T' },
    { pos: 2, letter: 'T' },
    { pos: 2, letter: 'G' },
    { pos: 3, letter: 'N' },
    { pos: 4, letter: 'E' }
  ],
  didYouKnow: 'Stepping outside your comfort zone, even in small ways, builds emotional resilience, increases self-confidence, and encourages creativity. Novel experiences actually stimulate new neural connections, keeping the brain young and adaptive.'
},
'top-that': {
  id: 'casserole',
  title: 'Casserole',
  category: 'Casserole',
  words: ['DISH', 'SHARE', 'RECIPE', 'HOTDISH', 'COOKBOOK'],
  hints: [
    'A casserole is this type of food',
    'What the crew does with meals together',
    'Instructions for making the casserole',
    'Midwestern term for a warm casserole',
    'Where to find more delicious recipes'
  ],
  revealed: [
    { pos: 0, letter: 'D' },
    { pos: 2, letter: 'A' },
    { pos: 3, letter: 'I' },
    { pos: 3, letter: 'D' },
    { pos: 4, letter: 'B' }
  ],
  didYouKnow: 'The modern breakfast casserole is believed to have roots in a 19th-century German dish called Eiergeraeush, which literally translates to "egg noise." While casserole dishes are ancient, the "breakfast casserole" as we know it gained massive popularity in the 1950s due to the rise of convenience foods like canned soups and frozen hash browns.'
},
'food-for-thought': {
  id: 'top-ten',
  title: 'Top Ten',
  category: 'Top Ten',
  words: ['RUSH', 'VIBES', 'LEDGER', 'ANNUAL', 'PRESSURE'],
  hints: [
    'No need for this tonight',
    'Good ones all around!',
    'Well-worn book of Top Ten history',
    'Once-a-year tradition',
    'Mr. Lindsay says there\'s none of this'
  ],
  revealed: [
    { pos: 1, letter: 'U' },
    { pos: 1, letter: 'I' },
    { pos: 2, letter: 'D' },
    { pos: 2, letter: 'N' },
    { pos: 2, letter: 'E' }
  ],
  didYouKnow: '"Food for thought" refers to information, ideas, or insights that deserve serious contemplation or require time to "digest" mentally. It implies that ideas nourish the mind just as food nourishes the body, with roots in ancient philosophy and common usage since the 1800s.'
},
'stay-for-the-vibe': {
  id: 'stay-for-the-vibe',
  title: 'Stay for the Vibe',
  category: 'Stay for the Vibe',
  words: ['VIBE', 'CHEER', 'CHOOSE', 'CONNECT', 'ANNOUNCE'],
  hints: [
    'The feeling you choose to bring or how you get along found in the title',
    "The crew's enthusiastic response",
    'Pick your puzzle experience',
    'What a fresh puzzle sparks',
    'What Laurel does with the ledger entry'
  ],
  revealed: [
    { pos: 2, letter: 'B' },
    { pos: 1, letter: 'H' },
    { pos: 4, letter: 'S' },
    { pos: 3, letter: 'N' },
    { pos: 5, letter: 'N' }
  ],
  didYouKnow: 'Enjoyment is essential for well-being, lowering stress, heart rates, and boosting happiness. Otters hold hands while sleeping to stay together, smelling flowers improves mood, and buying experiences, such as trips and concerts, rather than objects brings lasting joy.'
},
'st-patricks-day-scavenger-hunt': {
  id: 'scavenger-hunt',
  title: 'Scavenger Hunt',
  category: 'Scavenger Hunt',
  words: ['STAR', 'GREEN', 'TEAPOT', 'MESSAGE', 'SNEAKERS'],
  hints: [
    'The first item on the scavenger hunt list ⭐️',
    'The color of Isaac\'s cardigan vest and a treat to share 🟢',
    'Item #2 on the hunt list 🫖',
    'A text, a note, or a greeting from anyone 🗒️',
    'Sarah reminds everyone to lace these up!'
  ],
  revealed: [
    { pos: 1, letter: 'T' },
    { pos: 2, letter: 'E' },
    { pos: 3, letter: 'P' },
    { pos: 3, letter: 'S' },
    { pos: 4, letter: 'K' }
  ],
  didYouKnow: 'Scavenger hunts, which originated as party games in the 1930s, are popular team-building activities that enhance problem-solving and collaboration. The largest, hosted in Provo, Utah in 2014, featured 2,079 participants, while the term itself is inspired by animals like raccoons. Modern hunts often use photo and video challenges over physical collecting.'
},
'a-scrapbook': {
  id: 'scrapbook',
  title: 'Scrapbook',
  category: 'Scrapbook',
  words: ['PAGE', 'ALBUM', 'MEMORY', 'JOURNAL', 'MEMENTOS'],
  hints: [
    'Where a scrapbook memory lives',
    'A collection of photos and keepsakes',
    'Isaac\'s green sweater selfie is one of these',
    'Laurel\'s coffee-splattered record from last year',
    'Scavenger hunt items worth commemorating'
  ],
  revealed: [
    { pos: 1, letter: 'A' },
    { pos: 2, letter: 'B' },
    { pos: 2, letter: 'M' },
    { pos: 3, letter: 'R' },
    { pos: 3, letter: 'E' }
  ],
  didYouKnow: 'Early scrapbooks, known as commonplace books, were used to compile recipes, quotes, and letters. Engaging in this creative hobby can reduce anxiety, improve focus, and strengthen neural networks.'
},
'top-ten-toast': {
  id: 'toast',
  title: 'Toast',
  category: 'Toast',
  words: ['LIFT', 'CLINK', 'CHEERS', 'RAISING', 'ADVENTURE'],
  hints: [
    'What Laurel does with her coffee cup',
    'The sound of mugs coming together',
    'Sarah\'s enthusiastic send-off',
    'What the crew does with their mugs as if choreographed',
    'Puzzles yet to be solved and experiences yet to be had'
  ],
  revealed: [
    { pos: 1, letter: 'I' },
    { pos: 2, letter: 'I' },
    { pos: 2, letter: 'E' },
    { pos: 3, letter: 'S' },
    { pos: 4, letter: 'N' }
  ],
  didYouKnow: 'In the 17th century, people literally dropped spiced, burnt bread into wine to make it taste better. Over time, the name stuck to the drink itself.'
},
'the-cafe-has-an-almanac': {
  id: 'cafe-almanac',
  title: 'Cafe History',
  category: 'Cafe History',
  words: ['FLAT', 'PARIS', 'DRAGON', 'ALMANAC', 'MUSHROOM'],
  hints: [
    'Josie\'s go-to school shoe, ballet style',
    'City that captivated the cafe during the 2024 Summer Olympics',
    'Josie drew cute pictures of these instead of reading romantasy',
    'The leather-bound tome Josie pulled off the cafe shelf',
    'The coffee trend that filled everyone\'s to-go cup in 2024'
  ],
  revealed: [
    { pos: 1, letter: 'L' },
    { pos: 1, letter: 'A' },
    { pos: 3, letter: 'G' },
    { pos: 3, letter: 'A' },
    { pos: 4, letter: 'R' }
  ],
  didYouKnow: 'Mushrooms have a history in traditional medicine, however, direct, extensive research on the combination with coffee is limited, with some experts attributing benefits to simply lower caffeine intake.'
},
};

// Mobile touch optimization styles - reusable objects
const touchOptimizationContainer = {
  touchAction: 'manipulation',
  overscrollBehavior: 'none',
  WebkitOverflowScrolling: 'touch'
};

const touchOptimizationInteractive = {
  touchAction: 'manipulation',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  WebkitTapHighlightColor: 'transparent'
};

// Generate letters for a puzzle (excluding revealed letters)
function generateLetterPool(words, revealed) {
  const allLetters = words.join('').split('');
  
  // Remove revealed letters from the pool
  revealed.forEach((rev, wordIndex) => {
    if (rev) {
      const letterToRemove = rev.letter;
      const idx = allLetters.indexOf(letterToRemove);
      if (idx !== -1) {
        allLetters.splice(idx, 1);
      }
    }
  });
  
  // Shuffle the letters
  for (let i = allLetters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allLetters[i], allLetters[j]] = [allLetters[j], allLetters[i]];
  }
  return allLetters;
}

// Puzzle Component
function LetterGriddlePuzzle({ puzzle, storyTitle }) {
  const [letterPool, setLetterPool] = useState([]);
  const [guesses, setGuesses] = useState(puzzle.words.map(() => []));
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [completed, setCompleted] = useState(puzzle.words.map(() => false));
  const [revealedHints, setRevealedHints] = useState(puzzle.words.map(() => false));
  const [activeWordIndex, setActiveWordIndex] = useState(0);
const [shareStatus, setShareStatus] = useState(null);
  useEffect(() => {
    setLetterPool(generateLetterPool(puzzle.words, puzzle.revealed));
    const initialGuesses = puzzle.words.map((word, wordIndex) => {
      const guess = Array(word.length).fill(null);
      const revealed = puzzle.revealed[wordIndex];
      if (revealed) {
        guess[revealed.pos] = { letter: revealed.letter, revealed: true };
      }
      return guess;
    });
    setGuesses(initialGuesses);
    setCompleted(puzzle.words.map(() => false));
  }, [puzzle]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      
      if (/^[A-Z]$/.test(key)) {
        const poolIndex = letterPool.findIndex(letter => letter === key);
        if (poolIndex !== -1) {
          const wordGuess = guesses[activeWordIndex];
          if (!wordGuess || completed[activeWordIndex]) return;
          
          const emptySlotIndex = wordGuess.findIndex(g => g === null);
          if (emptySlotIndex !== -1) {
            placeLetterInSlot(activeWordIndex, emptySlotIndex, key, poolIndex);
          }
        }
      }
      
      if (e.key === 'Backspace') {
        const wordGuess = guesses[activeWordIndex];
        if (!wordGuess || completed[activeWordIndex]) return;
        
        for (let i = wordGuess.length - 1; i >= 0; i--) {
          if (wordGuess[i] && !wordGuess[i].revealed) {
            removeLetterFromSlot(activeWordIndex, i);
            break;
          }
        }
      }
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        setActiveWordIndex(prev => {
          let next = (prev + 1) % puzzle.words.length;
          while (completed[next] && next !== prev) {
            next = (next + 1) % puzzle.words.length;
          }
          return next;
        });
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        setActiveWordIndex(prev => {
          let next = (prev - 1 + puzzle.words.length) % puzzle.words.length;
          while (completed[next] && next !== prev) {
            next = (next - 1 + puzzle.words.length) % puzzle.words.length;
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letterPool, guesses, activeWordIndex, completed, puzzle.words.length]);

  // FIXED: Now stores the letter itself instead of relying on poolIndex
  const placeLetterInSlot = (wordIndex, slotIndex, letter, poolIndex) => {
    const newGuesses = [...guesses];
    newGuesses[wordIndex] = [...newGuesses[wordIndex]];
    // Store the letter - we'll add it back to the pool when removed
    newGuesses[wordIndex][slotIndex] = { letter };
    setGuesses(newGuesses);
    
    // Remove the letter from the pool by splicing it out entirely
    const newPool = letterPool.filter((_, idx) => idx !== poolIndex);
    setLetterPool(newPool);
    setSelectedLetter(null);
    
    const wordGuess = newGuesses[wordIndex];
    if (wordGuess.every(g => g !== null)) {
      const guessedWord = wordGuess.map(g => g.letter).join('');
      if (guessedWord === puzzle.words[wordIndex]) {
        const newCompleted = [...completed];
        newCompleted[wordIndex] = true;
        setCompleted(newCompleted);
        const nextIncomplete = newCompleted.findIndex((c, i) => !c && i > wordIndex);
        if (nextIncomplete !== -1) {
          setActiveWordIndex(nextIncomplete);
        } else {
          const firstIncomplete = newCompleted.findIndex(c => !c);
          if (firstIncomplete !== -1) {
            setActiveWordIndex(firstIncomplete);
          }
        }
      }
    }
  };

  // FIXED: Simply adds the letter back to the pool
  const removeLetterFromSlot = (wordIndex, slotIndex) => {
    const newGuesses = [...guesses];
    newGuesses[wordIndex] = [...newGuesses[wordIndex]];
    const returnedLetter = newGuesses[wordIndex][slotIndex];
    newGuesses[wordIndex][slotIndex] = null;
    setGuesses(newGuesses);
    
    // Simply add the letter back to the pool
    if (returnedLetter && returnedLetter.letter && !returnedLetter.revealed) {
      setLetterPool(prev => [...prev, returnedLetter.letter]);
    }
  };

  const handleLetterClick = (letter, poolIndex) => {
    if (selectedLetter?.poolIndex === poolIndex) {
      setSelectedLetter(null);
      return;
    }
    setSelectedLetter({ letter, poolIndex });
  };

  const handleSlotClick = (wordIndex, slotIndex) => {
    if (completed[wordIndex]) return;
    
    const currentGuess = guesses[wordIndex][slotIndex];
    
    if (currentGuess?.revealed) return;
    
    if (selectedLetter && !currentGuess) {
      placeLetterInSlot(wordIndex, slotIndex, selectedLetter.letter, selectedLetter.poolIndex);
    }
    else if (currentGuess && !currentGuess.revealed) {
      removeLetterFromSlot(wordIndex, slotIndex);
    }
  };

  const shuffleLetters = () => {
    setLetterPool(prev => {
      const shuffled = [...prev];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  const resetPuzzle = () => {
    setLetterPool(generateLetterPool(puzzle.words, puzzle.revealed));
    const initialGuesses = puzzle.words.map((word, wordIndex) => {
      const guess = Array(word.length).fill(null);
      const revealed = puzzle.revealed[wordIndex];
      if (revealed) {
        guess[revealed.pos] = { letter: revealed.letter, revealed: true };
      }
      return guess;
    });
    setGuesses(initialGuesses);
    setCompleted(puzzle.words.map(() => false));
    setRevealedHints(puzzle.words.map(() => false));
    setSelectedLetter(null);
    setActiveWordIndex(0);
  };

  const revealHint = (wordIndex) => {
    setRevealedHints(prev => {
      const newHints = [...prev];
      newHints[wordIndex] = true;
      return newHints;
    });
  };

  const handleShare = async () => {
    const shareText = `I solved the ${storyTitle} puzzle on Letter Griddle Cafe! ☕🥞🎶\nlettergriddlecafe.com\nPlay more games at lettergriddle.com`;
    
    if (navigator.share) {
      try {
        await navigator.share({ 
          text: shareText
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(shareText);
        }
      }
    } else {
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShareStatus('copied');
      setTimeout(() => setShareStatus(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const allCompleted = completed.every(c => c);

  return (
    <div className="puzzle-container" style={touchOptimizationContainer}>
      <div className="puzzle-header">
        <span className="puzzle-icon">☕</span>
        <span className="puzzle-title">Letter Griddle</span>
        <span className="puzzle-icon">☕</span>
      </div>
      
      <div className="puzzle-category">{puzzle.title}</div>
      
      {/* Word rows */}
      <div className="word-rows">
        {puzzle.words.map((word, wordIndex) => (
          <div 
            key={wordIndex} 
            className={`word-row ${completed[wordIndex] ? 'completed' : ''} ${activeWordIndex === wordIndex && !completed[wordIndex] ? 'active' : ''}`}
            onClick={() => !completed[wordIndex] && setActiveWordIndex(wordIndex)}
            style={touchOptimizationInteractive}
          >
            {revealedHints[wordIndex] && !completed[wordIndex] && (
              <div className="hint-text">{puzzle.hints[wordIndex]}</div>
            )}
            <div className="word-row-content">
              <div className="word-length">{word.length} Letters</div>
              <div className="letter-slots">
                {Array(word.length).fill(null).map((_, slotIndex) => {
                  const guess = guesses[wordIndex]?.[slotIndex];
                  return (
                    <button
                      key={slotIndex}
                      className={`letter-slot ${guess ? 'filled' : ''} ${guess?.revealed ? 'revealed' : ''} ${completed[wordIndex] ? 'correct' : ''}`}
                      onClick={(e) => { e.stopPropagation(); handleSlotClick(wordIndex, slotIndex); }}
                      style={touchOptimizationInteractive}
                    >
                      {guess?.letter || ''}
                    </button>
                  );
                })}
              </div>
              {!completed[wordIndex] && !revealedHints[wordIndex] && (
                <button 
                  className="hint-btn"
                  onClick={(e) => { e.stopPropagation(); revealHint(wordIndex); }}
                  style={touchOptimizationInteractive}
                >
                  Hint
                </button>
              )}
            </div>
            {completed[wordIndex] && (
              <div className="word-complete-icon">☕</div>
            )}
          </div>
        ))}
      </div>

      {/* Letter pool - FIXED: No more null filtering issues */}
      <div className="letter-pool-container">
        <div className="letter-pool-header">
          <span className="skillet">🍳</span>
          <span>Letter Griddle</span>
          <span className="skillet">🍳</span>
        </div>
        <div className="letter-pool">
          {letterPool.map((letter, index) => (
            <button
              key={index}
              className={`pool-letter ${selectedLetter?.poolIndex === index ? 'selected' : ''}`}
              onClick={() => handleLetterClick(letter, index)}
              style={touchOptimizationInteractive}
            >
              {letter}
            </button>
          ))}
        </div>
        <button 
          className="shuffle-btn" 
          onClick={shuffleLetters}
          style={touchOptimizationInteractive}
        >
          Shuffle
        </button>
      </div>

      {/* Instructions */}
      <div className="puzzle-instructions">
        <p>• Click a letter, then click a slot to place it</p>
        <p>• Click a filled slot to return the letter</p>
        <p>• Desktop? Type letters directly! Use ↑↓ to switch words, Backspace to remove</p>
        <p>• Like a good recipe, sometimes you just have to try it and see!</p>
      </div>

      {/* Reset button */}
      <button 
        className="reset-btn" 
        onClick={resetPuzzle}
        style={touchOptimizationInteractive}
      >
        Reset Puzzle
      </button>

      {/* Completion celebration modal - full screen */}
      {allCompleted && (
        <div className="completion-modal-overlay">
          <div className="confetti-container">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i} 
                className="confetti" 
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-20px',
                  animationDelay: `${Math.random() * 0.5}s`,
                  backgroundColor: ['#f59e0b', '#fbbf24', '#92400e', '#fde68a', '#d97706'][Math.floor(Math.random() * 5)]
                }}
              />
            ))}
          </div>
          <div className="completion-modal">
            <div className="completion-emoji">☕🍯🥞</div>
            <h3>Delicious!</h3>
            <p>You solved the puzzle!</p>
            <div className="completion-buttons">
            <button 
              className="completion-btn share" 
              onClick={handleShare}
              style={touchOptimizationInteractive}
            >
                {shareStatus === 'copied' ? '✓ Copied!' : 'Share'}
              </button>
              <button 
                className="completion-btn primary" 
                onClick={resetPuzzle}
                style={touchOptimizationInteractive}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// Cast Modal Component
function CastModal({ onClose }) {
  return (
    <div className="cast-modal-overlay" onClick={onClose}>
      <div className="cast-modal" onClick={e => e.stopPropagation()}>
        <button className="cast-modal-close" onClick={onClose}>✕</button>
        <h2 className="cast-modal-title">Meet the Cast</h2>
        <div className="cast-modal-grid">
          {characters.map(character => (
            <div key={character.id} className="cast-card">
              <h3 className="cast-card-name">
                {character.emoji} {character.name}
              </h3>
              <ul className="cast-card-bio">
                {character.bio.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
              <p className="cast-card-fun-facts-label">Fun Facts:</p>
              <ul className="cast-card-fun-facts">
                {character.funFacts.map((fact, i) => (
                  <li key={i}>{fact}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// Story Card Component
function StoryCard({ story, onClick }) {
  return (
    <button 
      className={`story-card ${story.locked ? 'story-card-locked' : ''}`}
      onClick={story.locked ? undefined : onClick}
      disabled={story.locked}
      style={touchOptimizationInteractive}
    >
      <p className="story-card-label">Story & Puzzle</p>
      <h3 className="story-card-title">{story.title}</h3>
      {story.locked ? (
        <p className="story-card-locked-text">{story.subtitle}</p>
      ) : (
        <p className="story-card-date">{story.date}</p>
      )}
    </button>
  );
}

// Story Detail Component
function StoryDetail({ story, puzzle, onBack }) {
  return (
    <div className="story-detail" style={touchOptimizationContainer}>
      <button 
        className="back-btn" 
        onClick={onBack}
        style={touchOptimizationInteractive}
      >
        ← Back to Stories
      </button>

      <div className="story-content-wrapper">
        {/* Story Section */}
        <div className="story-section">
          <div className="story-text-card">
            {story.content.map((paragraph, i) => (
              <p key={i} className="story-paragraph">{paragraph}</p>
            ))}
            <div className="story-closing">
              <p>{story.closing}</p>
              {story.closingLink && (
                <a 
                  href={story.closingLink} 
                  className="story-closing-link"
                  style={touchOptimizationInteractive}
                >
                  {story.closingLinkText}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Puzzle Section */}
        <div className="puzzle-section">
          <div className="did-you-know">
            <h3>Did You Know?</h3>
            <p>{puzzle.didYouKnow}</p>
          </div>
          
          <LetterGriddlePuzzle puzzle={puzzle} storyTitle={story.title} />
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function LetterGriddleCafe() {
  const [selectedStory, setSelectedStory] = useState(null); 
const [showCastModal, setShowCastModal] = useState(false);
  return (
    <div 
      className="cafe-app"
      style={touchOptimizationContainer}
    >
      {/* Header */}
      <header className="cafe-header">
        <div className="header-content">
          <h1 className="header-title">The Letter Griddle Cafe</h1>
<p className="header-subtitle">Word puzzles. Stories. Fun Facts.</p>
<button
  className="meet-the-cast-btn"
  onClick={() => setShowCastModal(true)}
>
  Meet the Cast
</button>
{showCastModal && <CastModal onClose={() => setShowCastModal(false)} />}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {selectedStory ? (
          <StoryDetail 
            story={selectedStory} 
            puzzle={puzzles[selectedStory.id]}
            onBack={() => setSelectedStory(null)} 
          />
        ) : (
          <>
            <div className="stories-intro">
  <h2>Come for the trivia, pancakes, and coffee. Stay for the tea.</h2>
  <a href="https://griddlefalls.com" className="footer-link" style={{color: '#8B5A2B'}} target="_blank" rel="noopener noreferrer">
    ☕ Play Griddle Falls where it's always trivia night at the cafe
  </a>
</div>
            {(() => {
  const reversed = [...stories].reverse();
  const latestStories = reversed.slice(0, 2);
  const olderStories = reversed.slice(2);

  // Group older stories by month
  const groups = {};
  olderStories.forEach(story => {
    if (!groups[story.date]) groups[story.date] = [];
    groups[story.date].push(story);
  });

  return (
    <>
      {/* Latest 2 Vignettes */}
      <div className="latest-section">
        <h3 className="latest-header">☕ New at the Cafe</h3>
        <div className="story-grid">
          {latestStories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              onClick={() => {
  setSelectedStory(story);
  track('vignette_opened', { title: story.title, id: story.id });
}}
            />
          ))}
        </div>
      </div>

      {/* Older Stories Grouped by Month */}
      <div className="archive-section">
        <h3 className="archive-label">Previously at the Cafe</h3>
        {Object.entries(groups).map(([month, monthStories]) => (
          <div key={month} className="month-group">
            <h4 className="month-header">{month}</h4>
            <div className="story-grid">
              {monthStories.map(story => (
                <StoryCard
                  key={story.id}
                  story={story}
                  onClick={() => {
  setSelectedStory(story);
  track('vignette_opened', { title: story.title, id: story.id });
}}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
})()}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="cafe-footer">
        <p className="footer-text">
          Part of <a href="https://lettergriddle.com" className="footer-link">The Letter Griddle Games</a>
        </p>
        <div className="footer-social">
          <a href="https://instagram.com/letter_griddle" className="footer-link instagram-link" target="_blank" rel="noopener noreferrer">
            <svg className="instagram-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            @letter_griddle
          </a>
        </div>
        <div className="footer-links">
          <a href="https://lettergriddle.com/privacy" className="footer-link">Privacy</a>
          <span className="footer-divider">•</span>
          <a href="https://lettergriddle.com/terms" className="footer-link">Terms</a>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Letter Griddle.
        </p>
      </footer>
    </div>
  );
}