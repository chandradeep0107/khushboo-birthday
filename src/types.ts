export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  category: 'cherished' | 'adventures' | 'laughter' | 'milestones';
  image: string;
  shortCaption: string;
  fullStory: string;
}

export interface WishItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export interface BirthdayConfig {
  recipientName: string;
  recipientFullName: string;
  senderName: string;
  birthdayDate: string;
  tagline: string;
  page1Subtitle: string;
  page1Instruction: string;
  page2Heading: string;
  page2PersonalMessage: string;
  letterTitle: string;
  letterContent: string[];
  memoriesHeading: string;
  memoriesSubheading: string;
  memories: MemoryItem[];
  page4Heading: string;
  page4Message: string;
  wishes: WishItem[];
  finalGreeting: string;
  finalSubgreeting: string;
  madeWithLoveText: string;
}
