import { BirthdayConfig } from '../types';

export const initialBirthdayConfig: BirthdayConfig = {
  recipientName: "Khusboo",
  recipientFullName: "Khusboo Singh",
  senderName: "Mandeep",
  birthdayDate: "October 8",
  tagline: "A celebration of grace, laughter, and an extraordinary soul",
  
  // Page 1: The Arrow of the Heart
  page1Subtitle: "Some moments deserve to be remembered forever...",
  page1Instruction: "Shoot the arrow to begin ❤️",

  // Page 2: Happy Birthday
  page2Heading: "Happy Birthday",
  page2PersonalMessage: "Today isn't just another day... Today is a celebration of you, your journey, your smile, your memories, and all the beautiful moments you've brought into the lives of the people around you.",
  letterTitle: "Happy Birthday, Sweetie! ❤️",
  letterContent: [
    "Happy Birthday, Sweetie! ❤️ I honestly don’t know how to put our bond into a few words because it’s become so much more than just a friendship to me. From those random late-night talks where we somehow start with one topic and end up discussing our entire lives, to the stupidest jokes, endless rants, sharing things we probably wouldn’t tell anyone else, and those moments where we didn’t even need to say much to understand each other — every little thing has made our connection so special.",
    "You’ve become one of those people I can talk to at literally any hour, about literally anything, and somehow you always make things feel a little lighter. There are so many memories, conversations and little moments between us that probably look ordinary to everyone else, but mean so much to me.",
    "On your special day, I just want you to know how genuinely grateful I am that life gave me a bestie like you. I hope this year gives you everything you’ve been silently wishing for, all the happiness you deserve, and countless reasons to smile. Keep being the amazing, crazy, beautiful person you are.",
    "And no matter how much time passes, I hope we never lose these random conversations, our stupid laughs, our midnight talks and this crazy little bond of ours. Happy Birthday once again, Sweetie. ❤️🫶🏻 Here’s to you, to us, and to all the memories we haven’t made yet. 🥹✨"
  ],

  // Page 3: Our Memories (Exclusively the 5 real memories of Khusboo)
  memoriesHeading: "A Collection of Beautiful Memories",
  memoriesSubheading: "Some moments become memories. Some memories become stories.",
  memories: [
    {
      id: "mem-1",
      title: "Be Your Own Kind of Beautiful",
      date: "Golden Sunshine",
      location: "Warm Breezy Day",
      category: "cherished",
      image: "./images/khusboo-1.jpg",
      shortCaption: "Radiant, genuine, and unapologetically yourself.",
      fullStory: "That glowing smile and natural warmth you bring everywhere you go. Keep being the amazing, crazy, beautiful soul you are — there's truly no one else quite like you."
    },
    {
      id: "mem-2",
      title: "A Heart Full of Love",
      date: "A Peaceful Afternoon",
      location: "Lawn Under the Open Sky",
      category: "cherished",
      image: "./images/khusboo-2.jpg",
      shortCaption: "Making heart signs and keeping the vibe so pure and warm.",
      fullStory: "Sitting comfortably under the open sky, smiling and making that sweet hand heart. You have that rare gift of making everyone around you feel loved, welcomed, and appreciated."
    },
    {
      id: "mem-3",
      title: "That Contagious Laughter & Glow",
      date: "A Cozy Hangout",
      location: "Café Conversations",
      category: "laughter",
      image: "./images/khusboo-3.jpg",
      shortCaption: "The kind of laughter and smile that lights up any room instantly.",
      fullStory: "Over good food and endless rants, jumping between silly gossip and life talks. You've become that one person I can talk to at literally any hour about anything, and somehow you always make things feel lighter."
    },
    {
      id: "mem-4",
      title: "Peace, Blessings & Good Vibes",
      date: "A Serene Visit",
      location: "Serenity & Smiles",
      category: "adventures",
      image: "./images/khusboo-4.jpg",
      shortCaption: "Flashing that cute peace sign with unmatched positive energy.",
      fullStory: "A quiet, refreshing day out with endless breeze and positivity. Having a bestie like you to share these spontaneous moments with is one of life's greatest blessings."
    },
    {
      id: "mem-5",
      title: "Grace & Elegance in Blue",
      date: "Special Celebration",
      location: "Memorable Evening",
      category: "milestones",
      image: "./images/khusboo-5.jpg",
      shortCaption: "Carrying elegance, beauty, and confidence with effortless charm.",
      fullStory: "Looking absolutely breathtaking in blue. Some moments capture your aura so gracefully that they stay etched in memory forever. Here's to you, to us, and to all the memories we haven't made yet."
    }
  ],

  // Page 4: The Year Ahead
  page4Heading: "Here's to Your Next Chapter ✨",
  page4Message: "May this year bring you closer to everything you've been silently wishing for. May you find new reasons to smile, new places to explore, and the courage to chase everything your heart desires.",
  wishes: [
    {
      id: "wish-1",
      title: "More Happiness",
      icon: "❤️",
      description: "May your heart stay full and every single morning bring a quiet wave of peace, warmth, and genuine comfort.",
      color: "from-rose-500/20 to-pink-600/30 border-rose-400/40 text-rose-300"
    },
    {
      id: "wish-2",
      title: "More Adventures",
      icon: "✨",
      description: "May you explore unseen scenic corners, take spontaneous road trips, and embrace thrilling new horizons.",
      color: "from-amber-500/20 to-yellow-600/30 border-amber-400/40 text-amber-300"
    },
    {
      id: "wish-3",
      title: "More Success",
      icon: "🚀",
      description: "May your hard work turn into stellar achievements and every door swing open for your extraordinary talents.",
      color: "from-purple-500/20 to-indigo-600/30 border-purple-400/40 text-purple-300"
    },
    {
      id: "wish-4",
      title: "More Beautiful Memories",
      icon: "📸",
      description: "May your life be packed with unforgettable moments, midnight conversations, and candid belly laughs.",
      color: "from-teal-500/20 to-emerald-600/30 border-teal-400/40 text-teal-300"
    },
    {
      id: "wish-5",
      title: "More Reasons to Smile",
      icon: "😊",
      description: "May the little daily surprises and sweet serendipities brighten your spirit in the most magical ways.",
      color: "from-pink-500/20 to-rose-600/30 border-pink-400/40 text-pink-300"
    },
    {
      id: "wish-6",
      title: "More Dreams Coming True",
      icon: "🌟",
      description: "May the universe conspire to manifest the wishes you hold closest to your heart.",
      color: "from-yellow-500/20 to-amber-600/30 border-yellow-400/40 text-yellow-300"
    }
  ],
  finalGreeting: "Happy Birthday, Khusboo ❤️",
  finalSubgreeting: "Here's to another incredible year of your story.",
  madeWithLoveText: "Made with ❤️ by Mandeep for Khusboo"
};
