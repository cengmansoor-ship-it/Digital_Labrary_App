export type Language = 'Arabic' | 'Pashto' | 'Persian';

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  language: Language;
  category: string;
  year: string;
  pages: number;
  description: string;
  color: string;
  accent: string;
  progress?: number;
};

export const books: Book[] = [
  {
    id: 'principles-of-belief',
    title: 'Principles of Belief',
    subtitle: 'A clear path through the foundations of faith',
    language: 'Arabic',
    category: 'Theology',
    year: '1421 AH',
    pages: 286,
    description: 'A careful study of belief, reason, and spiritual practice, gathered from years of teaching and reflection.',
    color: '#4b3328',
    accent: '#e4b36d',
    progress: 0.62,
  },
  {
    id: 'the-language-of-wisdom',
    title: 'The Language of Wisdom',
    subtitle: 'Notes on reading, teaching, and remembrance',
    language: 'Persian',
    category: 'Essays',
    year: '1396 SH',
    pages: 164,
    description: 'Short meditations on the quiet work of learning and the responsibilities carried by a teacher.',
    color: '#34443d',
    accent: '#c9a56d',
    progress: 0.18,
  },
  {
    id: 'questions-of-the-heart',
    title: 'Questions of the Heart',
    subtitle: 'Collected answers from the study circle',
    language: 'Arabic',
    category: 'Q&A',
    year: '1414 AH',
    pages: 412,
    description: 'A generous collection of questions and answers, arranged for readers returning to the essential questions.',
    color: '#6f3c32',
    accent: '#e8c28d',
  },
  {
    id: 'a-companion-for-the-way',
    title: 'A Companion for the Way',
    subtitle: 'Daily readings for a life of attention',
    language: 'Pashto',
    category: 'Reflections',
    year: '1389 SH',
    pages: 208,
    description: 'One hundred and eight readings for a slower, more attentive day. Designed to be opened anywhere.',
    color: '#42525c',
    accent: '#d2b27e',
  },
  {
    id: 'the-ethics-of-learning',
    title: 'The Ethics of Learning',
    subtitle: 'Adab, intention, and the making of a student',
    language: 'Arabic',
    category: 'Education',
    year: '1402 AH',
    pages: 132,
    description: 'A foundational text about the manners of seeking knowledge and the inner life of the student.',
    color: '#594636',
    accent: '#d6ad76',
  },
];

export const categories = ['All', 'Theology', 'Essays', 'Q&A', 'Reflections', 'Education'];