import { PracticeModule, PracticeQuestion } from '../types/practice';
import { gkTrivia, sciTrivia, hindiTrivia } from './grade1Trivia';

export const GRADE1_MODULES: PracticeModule[] = [
  {
    id: 'g1-maths-additions',
    title: 'Grade 1 Additions',
    subject: 'maths_additions',
    description: 'Master addition skills with interactive challenges, fruit counting, and sum puzzles!',
    icon: '➕',
    difficulty: 'Beginner',
    questions: generateAdditionQuestions(160)
  },
  {
    id: 'g1-maths-subtractions',
    title: 'Grade 1 Subtractions',
    subject: 'maths_subtractions',
    description: 'Learn subtraction concepts by popping balloons, helping birds fly away, and solving differences!',
    icon: '➖',
    difficulty: 'Beginner',
    questions: generateSubtractionQuestions(160)
  },
  {
    id: 'g1-maths-wordproblems',
    title: 'Grade 1 Word Problems',
    subject: 'maths_wordproblems',
    description: 'Solve fun real-world logical stories combining addition, subtraction, and reasoning!',
    icon: '🧩',
    difficulty: 'Beginner',
    questions: generateWordProblems(160)
  },
  {
    id: 'g1-abacus-counting',
    title: 'Grade 1 Abacus Master',
    subject: 'abacus',
    description: 'Learn to count, add, and reason with a digital & interactive abacus! Slide beads to solve values.',
    icon: '🧮',
    difficulty: 'Beginner',
    questions: generateAbacusQuestions(160, 'beginner', 101)
  },
  {
    id: 'g1-english-logic',
    title: 'Grade 1 English Logic',
    subject: 'english',
    description: 'Learn spelling patterns, rhyming words, opposites, and logic challenges to boost reading skills!',
    icon: '📚',
    difficulty: 'Beginner',
    questions: generateEnglishLogicQuestions(160)
  },
  {
    id: 'g1-fraction-shapes',
    title: 'Grade 1 Fraction Shapes',
    subject: 'fraction',
    description: 'Divide pizzas and shade segments to understand halves, quarters, and parts of a whole shape!',
    icon: '🍕',
    difficulty: 'Beginner',
    questions: generateFractionQuestions(160)
  },
  {
    id: 'g1-general-knowledge',
    title: 'Grade 1 General Knowledge',
    subject: 'general_knowledge',
    description: 'Explore the world around you with fun quizzes about animals, countries, seasons, and history!',
    icon: '🌍',
    difficulty: 'Beginner',
    questions: []
  },
  {
    id: 'g1-science',
    title: 'Grade 1 Science',
    subject: 'science',
    description: 'Learn about living things, body parts, animals and their homes, weather, and the solar system!',
    icon: '🧪',
    difficulty: 'Beginner',
    questions: []
  },
  {
    id: 'g1-games',
    title: 'Grade 1 Games',
    subject: 'games',
    description: 'Play brain-engaging games like Maze Runner, Sliding Puzzle, Pattern Match, and Detective Club!',
    icon: '🎮',
    difficulty: 'Beginner',
    questions: []
  },
  {
    id: 'g1-hindi',
    title: 'Grade 1 Hindi',
    subject: 'hindi',
    description: 'Learn Hindi vowels, consonants, colors, animals, and basic vocabulary (स्वर, व्यंजन और शब्दावली)!',
    icon: '🗣️',
    difficulty: 'Beginner',
    questions: []
  }
];

// Helper to check if a digit sum is direct addition
function isDirectAdditionDigit(dA: number, dB: number): boolean {
  const upperA = dA >= 5 ? 1 : 0;
  const lowerA = dA % 5;
  const upperB = dB >= 5 ? 1 : 0;
  const lowerB = dB % 5;
  return (upperA + upperB <= 1) && (lowerA + lowerB <= 4);
}

// Helper to check if a digit sum uses small friend addition (+5 complement)
function isSmallFriendAdditionDigit(dA: number, dB: number): boolean {
  const upperA = dA >= 5 ? 1 : 0;
  const lowerA = dA % 5;
  const upperB = dB >= 5 ? 1 : 0;
  const lowerB = dB % 5;
  return (lowerA + lowerB > 4) && (upperA === 0) && (upperB === 0);
}

// Helper to check if a digit sum is direct subtraction
function isDirectSubtractionDigit(dA: number, dB: number): boolean {
  const upperA = dA >= 5 ? 1 : 0;
  const lowerA = dA % 5;
  const upperB = dB >= 5 ? 1 : 0;
  const lowerB = dB % 5;
  return (upperA >= upperB) && (lowerA >= lowerB);
}

// Helper to check if a digit sum uses small friend subtraction (-5 complement)
function isSmallFriendSubtractionDigit(dA: number, dB: number): boolean {
  const upperA = dA >= 5 ? 1 : 0;
  const lowerA = dA % 5;
  const upperB = dB >= 5 ? 1 : 0;
  const lowerB = dB % 5;
  return (lowerA < lowerB) && (upperA === 1) && (upperB === 0);
}

export function isDirectAddition(a: number, b: number): boolean {
  const digitsA = [a % 10, Math.floor((a % 100) / 10), Math.floor((a % 1000) / 100)];
  const digitsB = [b % 10, Math.floor((b % 100) / 10), Math.floor((b % 1000) / 100)];
  for (let i = 0; i < 3; i++) {
    if (!isDirectAdditionDigit(digitsA[i], digitsB[i])) return false;
  }
  return true;
}

export function isDirectSubtraction(a: number, b: number): boolean {
  if (a < b) return false;
  const digitsA = [a % 10, Math.floor((a % 100) / 10), Math.floor((a % 1000) / 100)];
  const digitsB = [b % 10, Math.floor((b % 100) / 10), Math.floor((b % 1000) / 100)];
  for (let i = 0; i < 3; i++) {
    if (!isDirectSubtractionDigit(digitsA[i], digitsB[i])) return false;
  }
  return true;
}

export function isSmallFriendAddition(a: number, b: number): boolean {
  const digitsA = [a % 10, Math.floor((a % 100) / 10), Math.floor((a % 1000) / 100)];
  const digitsB = [b % 10, Math.floor((b % 100) / 10), Math.floor((b % 1000) / 100)];
  
  let hasSmallFriend = false;
  for (let i = 0; i < 3; i++) {
    const isDirect = isDirectAdditionDigit(digitsA[i], digitsB[i]);
    const isSF = isSmallFriendAdditionDigit(digitsA[i], digitsB[i]);
    
    if (!isDirect && !isSF) return false; // Contains big friend carry/other
    if (isSF) hasSmallFriend = true;
  }
  return hasSmallFriend;
}

export function isSmallFriendSubtraction(a: number, b: number): boolean {
  if (a < b) return false;
  const digitsA = [a % 10, Math.floor((a % 100) / 10), Math.floor((a % 1000) / 100)];
  const digitsB = [b % 10, Math.floor((b % 100) / 10), Math.floor((b % 1000) / 100)];
  
  let hasSmallFriend = false;
  for (let i = 0; i < 3; i++) {
    const isDirect = isDirectSubtractionDigit(digitsA[i], digitsB[i]);
    const isSF = isSmallFriendSubtractionDigit(digitsA[i], digitsB[i]);
    
    if (!isDirect && !isSF) return false; // Contains big friend carry/other
    if (isSF) hasSmallFriend = true;
  }
  return hasSmallFriend;
}

// Define difficulty type
export type AbacusDifficulty = 'beginner' | 'medium' | 'expert';

// Procedural Abacus Question Generator
export function generateAbacusQuestions(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  const usedTargets = new Set<string>();

  // Deterministic math logic LCG seed
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };

  const getRandomInt = (min: number, max: number) => {
    return Math.floor(rand() * (max - min + 1)) + min;
  };

  let attempts = 0;
  const maxAttempts = 5000;

  while (questions.length < count && attempts < maxAttempts) {
    attempts++;
    
    // Choose type: 0 = MCQ Read, 1 = Represent Number, 2 = Addition Sum, 3 = Subtraction Sum
    const typeSelector = getRandomInt(0, 3);
    
    if (typeSelector === 0) {
      // ─── TYPE 0: MCQ READ THE ABACUS ───
      let target = 0;
      if (difficulty === 'beginner') {
        target = getRandomInt(1, 49); // Simple numbers
      } else if (difficulty === 'medium') {
        target = getRandomInt(5, 99); // More diverse double digit
      } else {
        target = getRandomInt(10, 999); // Up to 3 digits!
      }
      
      const key = `mcq-${target}`;
      if (usedTargets.has(key)) continue;
      usedTargets.add(key);

      // Generate 3 unique wrong options near target
      const optionsSet = new Set<number>();
      optionsSet.add(target);
      let mcqAttempts = 0;
      while (optionsSet.size < 4 && mcqAttempts < 50) {
        mcqAttempts++;
        let offset = getRandomInt(-5, 5);
        if (getRandomInt(0, 1) === 1) {
          offset = getRandomInt(0, 1) === 1 ? 10 : -10;
        }
        const wrongVal = target + offset;
        if (wrongVal > 0 && wrongVal <= (difficulty === 'expert' ? 999 : 99)) {
          optionsSet.add(wrongVal);
        }
      }
      let fallbackOffset = 1;
      while (optionsSet.size < 4) {
        const wrongVal = target + fallbackOffset;
        if (wrongVal > 0 && wrongVal <= (difficulty === 'expert' ? 999 : 99)) {
          optionsSet.add(wrongVal);
        }
        fallbackOffset++;
      }
      
      const optionsArr = Array.from(optionsSet).sort((a, b) => a - b);
      const correctIdx = optionsArr.indexOf(target).toString();
      const optionsDisplay = optionsArr.map(num => num.toString());

      const ones = target % 10;
      const tens = Math.floor((target % 100) / 10);
      const hundreds = Math.floor((target % 1000) / 100);

      questions.push({
        id: `procedural-ab-mcq-${difficulty}-${questions.length + 1}`,
        type: 'mcq',
        subject: 'abacus',
        questionText: 'Look at the abacus. What number is represented on it?',
        options: optionsDisplay,
        correctAnswer: correctIdx,
        abacusTargetCount: target,
        explanation: `Look at the place-value rods: ${hundreds > 0 ? `Hundreds rod shows ${hundreds} (${hundreds * 100}), ` : ''}Tens rod shows ${tens} (${tens * 10}), and Ones rod shows ${ones}. Adding them up gives ${target}.`,
        hint: {
          conceptClue: 'Look at each rod from left to right. Remember, the upper bead is 5 and each lower bead is 1!',
          stepByStepClue: `On the Ones rod we see ${ones}. On the Tens rod we see ${tens}. ${hundreds > 0 ? `On the Hundreds rod we see ${hundreds}. ` : ''}Combine them to get: ${target}.`
        }
      });
      
    } else if (typeSelector === 1) {
      // ─── TYPE 1: INTERACTIVE SET NUMBER ───
      let target = 0;
      if (difficulty === 'beginner') {
        target = getRandomInt(1, 30);
      } else if (difficulty === 'medium') {
        target = getRandomInt(11, 99);
      } else {
        target = getRandomInt(101, 999); // 3 digits!
      }

      const key = `set-${target}`;
      if (usedTargets.has(key)) continue;
      usedTargets.add(key);

      const ones = target % 10;
      const tens = Math.floor((target % 100) / 10);
      const hundreds = Math.floor((target % 1000) / 100);

      questions.push({
        id: `procedural-ab-set-${difficulty}-${questions.length + 1}`,
        type: 'abacus_count',
        subject: 'abacus',
        questionText: `Show the number ${target} on the abacus!`,
        correctAnswer: target,
        abacusTargetCount: target,
        explanation: `To show ${target}: ${hundreds > 0 ? `slide ${hundreds} bead(s) on the Hundreds rod, ` : ''}slide ${tens} bead(s) on the Tens rod, and slide ${ones} bead(s) on the Ones rod.`,
        hint: {
          conceptClue: `Divide ${target} into its place values: ${hundreds > 0 ? `${hundreds} Hundreds, ` : ''}${tens} Tens, and ${ones} Ones.`,
          stepByStepClue: `On the Ones (rightmost) rod, represent ${ones}. On the Tens (middle) rod, represent ${tens}. ${hundreds > 0 ? `On the Hundreds rod, represent ${hundreds}.` : ''}`
        }
      });

    } else if (typeSelector === 2) {
      // ─── TYPE 2: ADDITION equation ───
      let a = 0, b = 0;
      let valid = false;

      if (difficulty === 'beginner') {
        a = getRandomInt(1, 40);
        b = getRandomInt(1, 40);
        valid = isDirectAddition(a, b);
      } else if (difficulty === 'medium') {
        a = getRandomInt(1, 80);
        b = getRandomInt(1, 15);
        valid = isSmallFriendAddition(a, b);
      } else {
        a = getRandomInt(5, 450);
        b = getRandomInt(5, 450);
        valid = !isDirectAddition(a, b) && !isSmallFriendAddition(a, b) && (a + b <= 999);
      }

      if (!valid) continue;

      const sum = a + b;
      const key = `add-${a}-${b}`;
      if (usedTargets.has(key)) continue;
      usedTargets.add(key);

      let concept = 'Add the numbers together step-by-step.';
      let stepClue = `Add ${a} and ${b}. The sum is ${sum}.`;

      if (difficulty === 'medium') {
        concept = 'Since we do not have enough lower beads, use the upper 5-bead as a Small Friend complement!';
        stepClue = `To add ${b} to ${a}, slide the upper 5-bead down (+5) and slide the matching number of lower beads down. The total is ${sum}.`;
      } else if (difficulty === 'expert') {
        concept = 'Since the rod overflows, use the Big Friend rule! Carry 1 over to the column on the left (+10).';
        stepClue = `To add ${b} to ${a}, carry 1 over to the next column on the left and subtract the 10-complement. The total is ${sum}.`;
      }

      questions.push({
        id: `procedural-ab-add-${difficulty}-${questions.length + 1}`,
        type: 'abacus_count',
        subject: 'abacus',
        questionText: `Solve: ${a} + ${b}. Show the answer on the abacus!`,
        correctAnswer: sum,
        abacusTargetCount: sum,
        explanation: `We calculate: ${a} + ${b} = ${sum}. Represent the final answer of ${sum} on the abacus.`,
        hint: {
          conceptClue: concept,
          stepByStepClue: stepClue
        }
      });

    } else if (typeSelector === 3) {
      // ─── TYPE 3: SUBTRACTION equation ───
      let a = 0, b = 0;
      let valid = false;

      if (difficulty === 'beginner') {
        a = getRandomInt(5, 80);
        b = getRandomInt(1, 40);
        valid = isDirectSubtraction(a, b);
      } else if (difficulty === 'medium') {
        a = getRandomInt(5, 90);
        b = getRandomInt(1, 20);
        valid = isSmallFriendSubtraction(a, b);
      } else {
        a = getRandomInt(15, 800);
        b = getRandomInt(5, 750);
        valid = !isDirectSubtraction(a, b) && !isSmallFriendSubtraction(a, b) && (a >= b);
      }

      if (!valid) continue;

      const diff = a - b;
      const key = `sub-${a}-${b}`;
      if (usedTargets.has(key)) continue;
      usedTargets.add(key);

      let concept = 'Subtract step-by-step from the abacus.';
      let stepClue = `Subtract ${b} from ${a}. The answer is ${diff}.`;

      if (difficulty === 'medium') {
        concept = 'Use the Small Friend complement subtraction! Slide the upper 5-bead up (-5) and slide up the lower beads.';
        stepClue = `To subtract ${b} from ${a}, slide the upper 5-bead up and slide up the complement. The answer is ${diff}.`;
      } else if (difficulty === 'expert') {
        concept = 'This subtraction requires a Big Friend borrow from the column to the left (-10).';
        stepClue = `To subtract ${b} from ${a}, borrow 1 from the next rod to the left (-10) and add the 10-complement. The answer is ${diff}.`;
      }

      questions.push({
        id: `procedural-ab-sub-${difficulty}-${questions.length + 1}`,
        type: 'abacus_count',
        subject: 'abacus',
        questionText: `Solve: ${a} - ${b}. Show the answer on the abacus!`,
        correctAnswer: diff,
        abacusTargetCount: diff,
        explanation: `We calculate: ${a} - ${b} = ${diff}. Represent the final answer of ${diff} on the abacus.`,
        hint: {
          conceptClue: concept,
          stepByStepClue: stepClue
        }
      });
    }
  }

  // Fallback: if we didn't generate enough due to strict constraints, fill with basic direct ones
  while (questions.length < count) {
    const val = getRandomInt(1, 9);
    questions.push({
      id: `procedural-ab-fallback-${questions.length + 1}`,
      type: 'abacus_count',
      subject: 'abacus',
      questionText: `Show the number ${val} on the abacus!`,
      correctAnswer: val,
      abacusTargetCount: val,
      explanation: `Show the value ${val} on the abacus.`,
      hint: {
        conceptClue: `Slide ${val} lower bead(s) up.`,
        stepByStepClue: `Slide exactly ${val} lower bead(s) up on the Ones rod.`
      }
    });
  }

  return questions;
}

export function generateAdditionQuestions(count: number): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  for (let i = 0; i < count; i++) {
    let a = 0;
    let b = 0;
    if (i < 50) {
      a = (i % 9) + 1;
      b = ((i * 3) % 9) + 1;
    } else if (i < 100) {
      a = (i % 30) + 10;
      b = ((i * 3) % 9) + 1;
    } else {
      a = (i % 80) + 10;
      b = ((i * 7) % 80) + 10;
    }

    const sum = a + b;
    const optionsSet = new Set<string>();
    optionsSet.add(sum.toString());
    let attempts = 0;
    while (optionsSet.size < 4 && attempts < 50) {
      attempts++;
      const wrong = sum + ((i % 2 === 0) ? 1 : -1) * (Math.floor(Math.random() * 4) + 1);
      if (wrong > 0 && wrong !== sum) {
        optionsSet.add(wrong.toString());
      }
    }
    let fallbackOffset = 1;
    while (optionsSet.size < 4) {
      const wrong = sum + fallbackOffset;
      if (wrong > 0 && wrong !== sum) {
        optionsSet.add(wrong.toString());
      }
      fallbackOffset++;
    }
    const options = Array.from(optionsSet).sort((x, y) => Number(x) - Number(y));
    const correctIndex = options.indexOf(sum.toString()).toString();

    let questionText = '';
    let conceptClue = '';
    let stepByStepClue = '';
    
    const style = i % 4;
    if (style === 0) {
      questionText = `What is ${a} + ${b}?`;
      conceptClue = `Add the two numbers together. You can count on from ${Math.max(a, b)} by ${Math.min(a, b)}.`;
      stepByStepClue = `Start at ${a} and count up by ${b}: ${a} ... plus ${b} is equal to ${sum}.`;
    } else if (style === 1) {
      questionText = `Solve the addition equation: ${a} + ${b} = ___`;
      conceptClue = `Find the sum of ${a} and ${b}.`;
      stepByStepClue = `Combining ${a} and ${b} gives exactly ${sum}.`;
    } else if (style === 2) {
      questionText = `Calculate: ${a} + ${b} = ___`;
      conceptClue = `Find the combined value of ${a} and ${b}.`;
      stepByStepClue = `Adding ${b} to ${a} yields ${sum}.`;
    } else {
      questionText = `What is the sum of ${a} and ${b}?`;
      conceptClue = `Sum is the answer you get when you add numbers together.`;
      stepByStepClue = `The sum of ${a} and ${b} is calculated as: ${a} + ${b} = ${sum}.`;
    }

    questions.push({
      id: `procedural-add-${i + 1}`,
      type: 'mcq',
      subject: 'maths_additions',
      questionText,
      options,
      correctAnswer: correctIndex,
      explanation: `To add ${a} and ${b}, count up: ${a} + ${b} = ${sum}.`,
      hint: {
        conceptClue,
        stepByStepClue
      }
    });
  }
  return questions;
}

export function generateSubtractionQuestions(count: number): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  for (let i = 0; i < count; i++) {
    let a = 0;
    let b = 0;
    
    if (i < 50) {
      a = (i % 9) + 6;
      b = ((i * 3) % 5) + 1;
    } else if (i < 100) {
      a = (i % 20) + 20;
      b = ((i * 3) % 9) + 1;
    } else {
      a = (i % 80) + 20;
      b = ((i * 7) % 19) + 1;
    }

    if (a < b) {
      const temp = a;
      a = b;
      b = temp;
    }

    const diff = a - b;
    const optionsSet = new Set<string>();
    optionsSet.add(diff.toString());
    let attempts = 0;
    while (optionsSet.size < 4 && attempts < 50) {
      attempts++;
      const wrong = diff + ((i % 2 === 0) ? 1 : -1) * (Math.floor(Math.random() * 4) + 1);
      if (wrong >= 0 && wrong !== diff) {
        optionsSet.add(wrong.toString());
      }
    }
    let fallbackOffset = 1;
    while (optionsSet.size < 4) {
      const wrong = diff + fallbackOffset;
      if (wrong >= 0 && wrong !== diff) {
        optionsSet.add(wrong.toString());
      }
      fallbackOffset++;
    }
    const options = Array.from(optionsSet).sort((x, y) => Number(x) - Number(y));
    const correctIndex = options.indexOf(diff.toString()).toString();

    let questionText = '';
    let conceptClue = '';
    let stepByStepClue = '';

    const style = i % 4;
    if (style === 0) {
      questionText = `What is ${a} - ${b}?`;
      conceptClue = `Subtract the second number from the first. You can count backwards from ${a}.`;
      stepByStepClue = `Start at ${a} and count back by ${b} steps. You will arrive at ${diff}.`;
    } else if (style === 1) {
      questionText = `Solve the subtraction equation: ${a} - ${b} = ___`;
      conceptClue = `Take away ${b} from ${a}.`;
      stepByStepClue = `Calculating the difference: ${a} minus ${b} is equal to ${diff}.`;
    } else if (style === 2) {
      questionText = `Calculate the difference: ${a} - ${b} = ___`;
      conceptClue = `Find what is left when you take ${b} away from ${a}.`;
      stepByStepClue = `Subtracting ${b} from ${a} yields ${diff}.`;
    } else {
      questionText = `Subtract ${b} from ${a}. What is the result?`;
      conceptClue = `Subtraction means finding the difference between two values.`;
      stepByStepClue = `Subtracting ${b} from ${a}: ${a} - ${b} = ${diff}.`;
    }

    questions.push({
      id: `procedural-sub-${i + 1}`,
      type: 'mcq',
      subject: 'maths_subtractions',
      questionText,
      options,
      correctAnswer: correctIndex,
      explanation: `To subtract ${b} from ${a}, we do: ${a} - ${b} = ${diff}.`,
      hint: {
        conceptClue,
        stepByStepClue
      }
    });
  }
  return questions;
}

export function generateWordProblems(count: number): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  const names = ['Aarav', 'Sita', 'Rohan', 'Priya', 'Amit', 'Karan', 'Neha', 'Rahul', 'Kavya', 'Aditya'];
  const items = ['chocolates', 'balloons', 'candies', 'toys', 'pencils', 'books', 'stars', 'stickers', 'apples', 'oranges'];

  for (let i = 0; i < count; i++) {
    const name = names[i % names.length];
    const item = items[(i * 3) % items.length];
    const isAddition = i % 2 === 0;
    
    let a = 0;
    let b = 0;
    let correctAnswerVal = 0;
    let questionText = '';
    let conceptClue = '';
    let stepByStepClue = '';
    let explanation = '';

    if (isAddition) {
      a = (i % 8) + 3;
      b = ((i * 3) % 7) + 2;
      correctAnswerVal = a + b;
      
      const templates = [
        `${name} has ${a} ${item}. Their friend gives them ${b} more ${item}. How many ${item} does ${name} have in total?`,
        `There are ${a} ${item} on a table. ${name} places ${b} more ${item} next to them. How many ${item} are on the table now?`,
        `${name} collected ${a} ${item} in the morning and ${b} ${item} in the afternoon. How many ${item} did they collect altogether?`
      ];
      questionText = templates[i % templates.length];
      conceptClue = `You need to add the two amounts together to find the grand total.`;
      stepByStepClue = `Add the initial amount (${a}) and the new amount (${b}): ${a} + ${b} = ${correctAnswerVal}.`;
      explanation = `${name} starts with ${a} ${item} and adds ${b} more. So, ${a} + ${b} = ${correctAnswerVal} ${item} in total.`;
    } else {
      a = (i % 8) + 12;
      b = ((i * 3) % 7) + 2;
      correctAnswerVal = a - b;

      const templates = [
        `${name} starts with ${a} ${item}. They give ${b} ${item} to their sister. How many ${item} does ${name} have left?`,
        `A box holds ${a} ${item}. ${name} takes out ${b} ${item} to play with. How many ${item} are left in the box?`,
        `${name} had ${a} ${item}, but lost ${b} of them on the way to school. How many ${item} do they have now?`
      ];
      questionText = templates[i % templates.length];
      conceptClue = `Take away the items that were given away, taken out, or lost to find how many remain.`;
      stepByStepClue = `Subtract the smaller group (${b}) from the larger starting group (${a}): ${a} - ${b} = ${correctAnswerVal}.`;
      explanation = `${name} had ${a} ${item} and gave/lost ${b}. So, we calculate: ${a} - ${b} = ${correctAnswerVal} ${item} remaining.`;
    }

    const optionsSet = new Set<string>();
    optionsSet.add(correctAnswerVal.toString());
    let attempts = 0;
    while (optionsSet.size < 4 && attempts < 50) {
      attempts++;
      const wrong = correctAnswerVal + ((i % 3 === 0) ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      if (wrong >= 0 && wrong !== correctAnswerVal) {
        optionsSet.add(wrong.toString());
      }
    }
    let fallbackOffset = 1;
    while (optionsSet.size < 4) {
      const wrong = correctAnswerVal + fallbackOffset;
      if (wrong >= 0 && wrong !== correctAnswerVal) {
        optionsSet.add(wrong.toString());
      }
      fallbackOffset++;
    }
    const options = Array.from(optionsSet).sort((x, y) => Number(x) - Number(y)).map(v => `${v} ${item}`);
    const correctIdxStr = options.indexOf(`${correctAnswerVal} ${item}`).toString();

    questions.push({
      id: `procedural-wp-${i + 1}`,
      type: 'mcq',
      subject: 'maths_wordproblems',
      questionText,
      options,
      correctAnswer: correctIdxStr,
      explanation,
      hint: {
        conceptClue,
        stepByStepClue
      }
    });
  }
  return questions;
}

export function generateEnglishLogicQuestions(count: number): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  
  const rhymes = [
    ['cat', 'hat', 'dog', 'tree'],
    ['dog', 'log', 'cat', 'pig'],
    ['pen', 'hen', 'box', 'run'],
    ['sun', 'run', 'toy', 'car'],
    ['ball', 'tall', 'star', 'book'],
    ['ring', 'sing', 'jump', 'cake'],
    ['cake', 'bake', 'fish', 'bird'],
    ['day', 'play', 'moon', 'stop'],
    ['look', 'book', 'duck', 'frog'],
    ['house', 'mouse', 'chair', 'sheep']
  ];

  const opposites = [
    ['hot', 'cold', 'sunny', 'fire'],
    ['big', 'small', 'huge', 'heavy'],
    ['tall', 'short', 'long', 'wide'],
    ['happy', 'sad', 'glad', 'play'],
    ['up', 'down', 'sky', 'high'],
    ['in', 'out', 'inside', 'door'],
    ['go', 'stop', 'run', 'move'],
    ['fast', 'slow', 'quick', 'car'],
    ['day', 'night', 'sun', 'bright'],
    ['heavy', 'light', 'dark', 'stone']
  ];

  const oddOnes = [
    ['apple', 'banana', 'orange', 'dog', 'The dog is an animal, while the others are delicious fruits!'],
    ['cat', 'dog', 'cow', 'pencil', 'The pencil is writing stationery, while the others are mammals!'],
    ['red', 'blue', 'green', 'happy', 'Happy is an emotion, while the others are primary or secondary colors!'],
    ['car', 'bus', 'train', 'bird', 'A bird is a living creature, while the others are vehicles of transport!'],
    ['pizza', 'burger', 'sandwich', 'chair', 'A chair is furniture, while the others are fast foods!'],
    ['sun', 'moon', 'star', 'shoes', 'Shoes are clothing items, while the others are celestial objects in space!'],
    ['swim', 'run', 'jump', 'sleeping', 'Sleeping is state of rest, while the others are physical motion verbs!'],
    ['brother', 'sister', 'mother', 'teacher', 'Teacher is a profession, while the others are family relations!']
  ];

  for (let i = 0; i < count; i++) {
    const type = i % 4;
    if (type === 0) {
      const pair = rhymes[i % rhymes.length];
      const targetWord = pair[0];
      const rhymingWord = pair[1];
      
      const optionsSet = new Set<string>();
      optionsSet.add(rhymingWord);
      optionsSet.add(pair[2]);
      optionsSet.add(pair[3]);
      optionsSet.add(targetWord + 't');
      
      const options = Array.from(optionsSet);
      const correctIdxStr = options.indexOf(rhymingWord).toString();

      questions.push({
        id: `procedural-el-rhyme-${i + 1}`,
        type: 'mcq',
        subject: 'english',
        questionText: `Which of these words rhymes with "${targetWord.toUpperCase()}"?`,
        options,
        correctAnswer: correctIdxStr,
        explanation: `The words "${targetWord}" and "${rhymingWord}" end with the same sound, so they rhyme.`,
        hint: {
          conceptClue: `Say "${targetWord}" out loud. Which option ends with the exact same sound?`,
          stepByStepClue: `Let's rhyme: "${targetWord}" rhymes with "${rhymingWord}".`
        }
      });
    } else if (type === 1) {
      const pair = opposites[i % opposites.length];
      const targetWord = pair[0];
      const oppositeWord = pair[1];

      const options = [oppositeWord, pair[2], pair[3], targetWord + 'ty'];
      const swapIdx = i % 4;
      const temp = options[0];
      options[0] = options[swapIdx];
      options[swapIdx] = temp;
      const correctIdxStrFinal = swapIdx.toString();

      questions.push({
        id: `procedural-el-opp-${i + 1}`,
        type: 'mcq',
        subject: 'english',
        questionText: `What is the opposite of the word "${targetWord.toUpperCase()}"?`,
        options,
        correctAnswer: correctIdxStrFinal,
        explanation: `The opposite meaning of "${targetWord}" is "${oppositeWord}".`,
        hint: {
          conceptClue: `Think of what is reverse to "${targetWord}".`,
          stepByStepClue: `The opposite of "${targetWord}" is "${oppositeWord}".`
        }
      });
    } else if (type === 2) {
      const item = oddOnes[i % oddOnes.length];
      const itemsList = [item[0], item[1], item[2], item[3]];
      const answer = item[3];
      const explanation = item[4];

      const correctIdxStr = itemsList.indexOf(answer).toString();

      questions.push({
        id: `procedural-el-odd-${i + 1}`,
        type: 'mcq',
        subject: 'english',
        questionText: `Find the ODD one out among these words:`,
        options: itemsList,
        correctAnswer: correctIdxStr,
        explanation,
        hint: {
          conceptClue: `Three of these belong to the same group. Which one does not fit?`,
          stepByStepClue: `Three items are related. "${answer}" is not like the others, so it is the odd one out.`
        }
      });
    } else {
      const wordsList = ['elephant', 'butterfly', 'dinosaur', 'rainbow', 'computer', 'aeroplane', 'umbrella', 'school', 'crocodile', 'giraffe'];
      const targetWord = wordsList[i % wordsList.length];
      
      let vowelCount = 0;
      for (const char of targetWord) {
        if ('aeiou'.includes(char)) vowelCount++;
      }

      const options = [vowelCount.toString(), (vowelCount + 1).toString(), (vowelCount - 1).toString(), (vowelCount + 2).toString()];
      const swapIdx = i % 4;
      const temp = options[0];
      options[0] = options[swapIdx];
      options[swapIdx] = temp;
      const correctIdxStrFinal = swapIdx.toString();

      questions.push({
        id: `procedural-el-vow-${i + 1}`,
        type: 'mcq',
        subject: 'english',
        questionText: `How many vowels (A, E, I, O, U) are in the word "${targetWord.toUpperCase()}"?`,
        options,
        correctAnswer: correctIdxStrFinal,
        explanation: `The vowels in "${targetWord}" are: ${targetWord.split('').filter(c => 'aeiou'.includes(c)).map(c => c.toUpperCase()).join(', ')}. That makes a total of ${vowelCount} vowels.`,
        hint: {
          conceptClue: `Find all letters in "${targetWord.toUpperCase()}" that are A, E, I, O, or U.`,
          stepByStepClue: `Count them one by one. There are ${vowelCount} vowels.`
        }
      });
    }
  }
  return questions;
}

export function generateFractionQuestions(count: number): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  const shapes = ['circle', 'square', 'rectangle'] as const;
  
  for (let i = 0; i < count; i++) {
    const isInteractive = i % 2 === 0;
    const segmentsArr = [2, 3, 4, 6, 8];
    const totalSegments = segmentsArr[i % segmentsArr.length];
    const shadedTarget = (i % (totalSegments - 1)) + 1;
    const shape = shapes[i % shapes.length];

    if (isInteractive) {
      questions.push({
        id: `procedural-fs-shade-${i + 1}`,
        type: 'fraction_shading',
        subject: 'fraction',
        questionText: `Shade exactly ${shadedTarget}/${totalSegments} of the ${shape}!`,
        correctAnswer: shadedTarget,
        fractionTotalSegments: totalSegments,
        fractionShadedTarget: shadedTarget,
        shapeType: shape,
        explanation: `To represent the fraction ${shadedTarget}/${totalSegments}, we need to click and color exactly ${shadedTarget} out of the ${totalSegments} equal segments.`,
        hint: {
          conceptClue: `The bottom number (${totalSegments}) is the total parts. The top number (${shadedTarget}) is how many parts you need to color.`,
          stepByStepClue: `Color exactly ${shadedTarget} segment(s) to shade ${shadedTarget}/${totalSegments} of the shape.`
        }
      });
    } else {
      const options = [`${shadedTarget}/${totalSegments}`, `1/${totalSegments}`, `${totalSegments - shadedTarget}/${totalSegments}`, `${totalSegments}/${shadedTarget}`];
      const swapIdx = i % 4;
      const temp = options[0];
      options[0] = options[swapIdx];
      options[swapIdx] = temp;
      const correctIdxStr = swapIdx.toString();

      questions.push({
        id: `procedural-fs-mcq-${i + 1}`,
        type: 'mcq',
        subject: 'fraction',
        questionText: `A circle is divided into ${totalSegments} equal segments. If you color ${shadedTarget} segments, what fraction of the circle is colored?`,
        options,
        correctAnswer: correctIdxStr,
        explanation: `Since ${shadedTarget} out of ${totalSegments} equal segments are colored, the fraction representing the colored part is ${shadedTarget}/${totalSegments}.`,
        hint: {
          conceptClue: `Write the number of shaded parts over the total number of parts.`,
          stepByStepClue: `Shaded parts = ${shadedTarget}, Total parts = ${totalSegments}. So the fraction is ${shadedTarget}/${totalSegments}.`
        }
      });
    }
  }
  return questions;
}

export function generateAdditionQuestionsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(rand() * (max - min + 1)) + min;
  };

  const usedTargets = new Set<string>();

  let attemptsOuter = 0;
  const maxAttemptsOuter = 5000;

  while (questions.length < count && attemptsOuter < maxAttemptsOuter) {
    attemptsOuter++;
    const i = questions.length;
    let a = 0;
    let b = 0;
    if (difficulty === 'beginner') {
      a = getRandomInt(1, 9);
      b = getRandomInt(1, 9);
    } else if (difficulty === 'medium') {
      a = getRandomInt(10, 99);
      b = getRandomInt(10, 99);
    } else {
      a = getRandomInt(100, 999);
      b = getRandomInt(100, 999);
    }

    const key = `${a}+${b}`;
    if (usedTargets.has(key)) continue;
    usedTargets.add(key);

    const sum = a + b;
    const optionsSet = new Set<string>();
    optionsSet.add(sum.toString());
    let attempts = 0;
    while (optionsSet.size < 4 && attempts < 50) {
      attempts++;
      const wrong = sum + ((i % 2 === 0) ? 1 : -1) * (getRandomInt(1, 4));
      if (wrong > 0 && wrong !== sum) {
        optionsSet.add(wrong.toString());
      }
    }
    let fallbackOffset = 1;
    while (optionsSet.size < 4) {
      const wrong = sum + fallbackOffset;
      if (wrong > 0 && wrong !== sum) {
        optionsSet.add(wrong.toString());
      }
      fallbackOffset++;
    }

    const options = Array.from(optionsSet).sort((x, y) => Number(x) - Number(y));

    questions.push({
      id: `procedural-add-${difficulty}-${i + 1}`,
      type: 'mcq', // Keep as mcq type to prevent UI layout crashes on review
      subject: 'maths_additions',
      questionText: `What is the result of the following sum?`,
      options,
      correctAnswer: sum.toString(), // Store actual value string
      explanation: `We align the columns and add: ${a} + ${b} = ${sum}.`,
      hint: {
        conceptClue: `Add the ones column first, then the tens${difficulty === 'expert' ? ', and then the hundreds' : ''}. Carry over if the sum is 10 or more.`,
        stepByStepClue: `Adding ${a} and ${b} gives a total of ${sum}.`
      },
      operandA: a,
      operandB: b,
      operator: '+'
    });
  }
  return questions;
}

export function generateSubtractionQuestionsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(rand() * (max - min + 1)) + min;
  };

  const usedTargets = new Set<string>();

  let attemptsOuter = 0;
  const maxAttemptsOuter = 5000;

  while (questions.length < count && attemptsOuter < maxAttemptsOuter) {
    attemptsOuter++;
    const i = questions.length;
    let a = 0;
    let b = 0;
    if (difficulty === 'beginner') {
      a = getRandomInt(1, 9);
      b = getRandomInt(1, 9);
    } else if (difficulty === 'medium') {
      a = getRandomInt(10, 99);
      b = getRandomInt(10, 99);
    } else {
      a = getRandomInt(100, 999);
      b = getRandomInt(100, 999);
    }

    if (a < b) {
      const temp = a;
      a = b;
      b = temp;
    }

    const key = `${a}-${b}`;
    if (usedTargets.has(key)) continue;
    usedTargets.add(key);

    const diff = a - b;
    const optionsSet = new Set<string>();
    optionsSet.add(diff.toString());
    let attempts = 0;
    while (optionsSet.size < 4 && attempts < 50) {
      attempts++;
      const wrong = diff + ((i % 2 === 0) ? 1 : -1) * (getRandomInt(1, 4));
      if (wrong >= 0 && wrong !== diff) {
        optionsSet.add(wrong.toString());
      }
    }
    let fallbackOffset = 1;
    while (optionsSet.size < 4) {
      const wrong = diff + fallbackOffset;
      if (wrong >= 0 && wrong !== diff) {
        optionsSet.add(wrong.toString());
      }
      fallbackOffset++;
    }

    const options = Array.from(optionsSet).sort((x, y) => Number(x) - Number(y));

    questions.push({
      id: `procedural-sub-${difficulty}-${i + 1}`,
      type: 'mcq',
      subject: 'maths_subtractions',
      questionText: `What is the result of the following subtraction?`,
      options,
      correctAnswer: diff.toString(), // Store actual value string
      explanation: `We align the columns and subtract: ${a} - ${b} = ${diff}.`,
      hint: {
        conceptClue: `Subtract the ones column first, then the tens${difficulty === 'expert' ? ', and then the hundreds' : ''}. Borrow from the next column on the left if needed.`,
        stepByStepClue: `Subtracting ${b} from ${a} leaves exactly ${diff}.`
      },
      operandA: a,
      operandB: b,
      operator: '-'
    });
  }
  return questions;
}

export function generateWordProblemsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(rand() * (max - min + 1)) + min;
  };

  const names = ['Aarav', 'Sita', 'Rohan', 'Priya', 'Amit', 'Karan', 'Neha', 'Rahul', 'Kavya', 'Aditya'];
  const items = ['chocolates', 'balloons', 'candies', 'toys', 'pencils', 'books', 'stars', 'stickers', 'apples', 'oranges'];

  const usedTargets = new Set<string>();
  let attemptsOuter = 0;
  const maxAttemptsOuter = 5000;

  while (questions.length < count && attemptsOuter < maxAttemptsOuter) {
    attemptsOuter++;
    const i = questions.length;
    const name = names[i % names.length];
    const item = items[(i * 3) % items.length];
    const isAddition = i % 2 === 0;
    
    let a = 0;
    let b = 0;
    if (difficulty === 'beginner') {
      a = getRandomInt(3, 9);
      b = getRandomInt(1, a - 1 || 1);
    } else if (difficulty === 'medium') {
      a = getRandomInt(15, 99);
      b = getRandomInt(10, a - 1 || 10);
    } else {
      a = getRandomInt(150, 999);
      b = getRandomInt(100, a - 1 || 100);
    }

    if (!isAddition && a < b) {
      const temp = a;
      a = b;
      b = temp;
    }

    const key = `${isAddition ? '+' : '-'}-${a}-${b}-${name}-${item}`;
    if (usedTargets.has(key)) continue;
    usedTargets.add(key);

    const correctAnswerVal = isAddition ? (a + b) : (a - b);
    let questionText = '';
    let conceptClue = '';
    let stepByStepClue = '';
    let explanation = '';

    if (isAddition) {
      const templates = [
        `${name} has ${a} ${item}. Their friend gives them ${b} more ${item}. How many ${item} does ${name} have in total?`,
        `There are ${a} ${item} on a table. ${name} places ${b} more ${item} next to them. How many ${item} are on the table now?`,
        `${name} collected ${a} ${item} in the morning and ${b} ${item} in the afternoon. How many ${item} did they collect altogether?`
      ];
      questionText = templates[i % templates.length];
      conceptClue = `You need to add the two amounts together to find the grand total.`;
      stepByStepClue = `Add the initial amount (${a}) and the new amount (${b}): ${a} + ${b} = ${correctAnswerVal}.`;
      explanation = `${name} starts with ${a} ${item} and adds ${b} more. So, ${a} + ${b} = ${correctAnswerVal} ${item} in total.`;
    } else {
      const templates = [
        `${name} starts with ${a} ${item}. They give ${b} ${item} to their sister. How many ${item} does ${name} have left?`,
        `A box holds ${a} ${item}. ${name} takes out ${b} ${item} to play with. How many ${item} are left in the box?`,
        `${name} had ${a} ${item}, but lost ${b} of them on the way to school. How many ${item} do they have now?`
      ];
      questionText = templates[i % templates.length];
      conceptClue = `Take away the items that were given away, taken out, or lost to find how many remain.`;
      stepByStepClue = `Subtract the smaller group (${b}) from the larger starting group (${a}): ${a} - ${b} = ${correctAnswerVal}.`;
      explanation = `${name} had ${a} ${item} and gave/lost ${b}. So, we calculate: ${a} - ${b} = ${correctAnswerVal} ${item} remaining.`;
    }

    const optionsSet = new Set<string>();
    optionsSet.add(correctAnswerVal.toString());
    let attempts = 0;
    while (optionsSet.size < 4 && attempts < 50) {
      attempts++;
      const wrong = correctAnswerVal + ((i % 3 === 0) ? 1 : -1) * (getRandomInt(1, 5));
      if (wrong >= 0 && wrong !== correctAnswerVal) {
        optionsSet.add(wrong.toString());
      }
    }
    let fallbackOffset = 1;
    while (optionsSet.size < 4) {
      const wrong = correctAnswerVal + fallbackOffset;
      if (wrong >= 0 && wrong !== correctAnswerVal) {
        optionsSet.add(wrong.toString());
      }
      fallbackOffset++;
    }
    const options = Array.from(optionsSet).sort((x, y) => Number(x) - Number(y)).map(v => `${v} ${item}`);
    const correctIdxStr = options.indexOf(`${correctAnswerVal} ${item}`).toString();

    questions.push({
      id: `procedural-wp-${difficulty}-${i + 1}`,
      type: 'mcq',
      subject: 'maths_wordproblems',
      questionText,
      options,
      correctAnswer: correctIdxStr,
      explanation,
      hint: {
        conceptClue,
        stepByStepClue
      },
      operandA: a,
      operandB: b,
      operator: isAddition ? '+' : '-',
      wordProblemItem: item
    });
  }
  return questions;
}

export function generateEnglishLogicQuestionsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(rand() * (max - min + 1)) + min;
  };

  const rhymesBeginner = [
    ['cat', 'hat', 'dog', 'tree'],
    ['dog', 'log', 'cat', 'pig'],
    ['pen', 'hen', 'box', 'run'],
    ['sun', 'run', 'toy', 'car'],
    ['bat', 'mat', 'ball', 'sky'],
    ['fox', 'box', 'pig', 'cow'],
    ['car', 'star', 'bus', 'bike'],
    ['bug', 'rug', 'ant', 'bird'],
    ['man', 'pan', 'boy', 'girl'],
    ['pig', 'big', 'cow', 'horse']
  ];
  const rhymesMedium = [
    ['ball', 'tall', 'star', 'book'],
    ['ring', 'sing', 'jump', 'cake'],
    ['cake', 'bake', 'fish', 'bird'],
    ['train', 'rain', 'car', 'bus'],
    ['boat', 'coat', 'ship', 'shoe'],
    ['mouse', 'house', 'cat', 'cheese'],
    ['bear', 'chair', 'lion', 'table'],
    ['snail', 'tail', 'bug', 'leaf']
  ];
  const rhymesExpert = [
    ['day', 'play', 'moon', 'stop'],
    ['look', 'book', 'duck', 'frog'],
    ['house', 'mouse', 'chair', 'sheep']
  ];

  const oppositesBeginner = [
    ['hot', 'cold', 'sunny', 'fire'],
    ['big', 'small', 'huge', 'heavy'],
    ['up', 'down', 'sky', 'high'],
    ['in', 'out', 'inside', 'door'],
    ['day', 'night', 'sun', 'moon'],
    ['happy', 'sad', 'smile', 'cry'],
    ['fast', 'slow', 'run', 'walk'],
    ['wet', 'dry', 'rain', 'water'],
    ['soft', 'hard', 'pillow', 'rock'],
    ['good', 'bad', 'nice', 'kind']
  ];
  const oppositesMedium = [
    ['tall', 'short', 'long', 'wide'],
    ['happy', 'sad', 'glad', 'play'],
    ['fast', 'slow', 'quick', 'car']
  ];
  const oppositesExpert = [
    ['go', 'stop', 'run', 'move'],
    ['day', 'night', 'sun', 'bright'],
    ['heavy', 'light', 'dark', 'stone']
  ];

  const oddOnesBeginner = [
    ['apple', 'banana', 'orange', 'dog', 'The dog is an animal, while the others are delicious fruits!'],
    ['red', 'blue', 'green', 'happy', 'Happy is an emotion, while the others are colors!'],
    ['cat', 'dog', 'cow', 'car', 'A car is a vehicle, while the others are animals!'],
    ['shirt', 'pants', 'socks', 'apple', 'An apple is food, while the others are clothing!'],
    ['milk', 'water', 'juice', 'book', 'A book is for reading, while the others are drinks!'],
    ['eye', 'ear', 'nose', 'shoe', 'A shoe goes on your foot, while the others are parts of the face!'],
    ['circle', 'square', 'triangle', 'cat', 'A cat is an animal, while the others are shapes!'],
    ['one', 'two', 'three', 'red', 'Red is a color, while the others are numbers!'],
    ['bus', 'car', 'train', 'tree', 'A tree is a plant, while the others are vehicles!'],
    ['sun', 'moon', 'star', 'fish', 'A fish lives in water, while the others are in the sky!']
  ];
  const oddOnesMedium = [
    ['cat', 'dog', 'cow', 'pencil', 'The pencil is writing stationery, while the others are mammals!'],
    ['pizza', 'burger', 'sandwich', 'chair', 'A chair is furniture, while the others are fast foods!']
  ];
  const oddOnesExpert = [
    ['car', 'bus', 'train', 'bird', 'A bird is a living creature, while the others are vehicles of transport!'],
    ['sun', 'moon', 'star', 'shoes', 'Shoes are clothing items, while the others are celestial objects in space!']
  ];

  const wordsBeginner = ['cat', 'dog', 'pig', 'sun', 'pen', 'run', 'toy', 'car', 'hat', 'log'];
  const wordsMedium = ['rabbit', 'monkey', 'donkey', 'banana', 'orange', 'purple', 'yellow', 'pencil'];
  const wordsExpert = ['elephant', 'crocodile', 'butterfly', 'dinosaur', 'computer', 'aeroplane', 'umbrella'];

  const allRhymes = [
    ...rhymesBeginner, ...rhymesMedium, ...rhymesExpert,
    ['goat', 'boat', 'cow', 'ship'], ['frog', 'log', 'toad', 'tree'], ['duck', 'truck', 'bird', 'car'], ['bear', 'pear', 'lion', 'apple']
  ];
  const allOpposites = [
    ...oppositesBeginner, ...oppositesMedium, ...oppositesExpert,
    ['clean', 'dirty', 'wash', 'mud'], ['empty', 'full', 'box', 'cup'], ['old', 'young', 'grandpa', 'baby'], ['near', 'far', 'close', 'away'], ['push', 'pull', 'door', 'open'], ['rich', 'poor', 'money', 'coins'], ['thick', 'thin', 'book', 'paper'], ['start', 'finish', 'begin', 'end'], ['win', 'lose', 'game', 'play']
  ];
  const allOddOnes = [
    ...oddOnesBeginner, ...oddOnesMedium, ...oddOnesExpert,
    ['rose', 'lily', 'tulip', 'broccoli', 'Broccoli is a vegetable, while the others are flowers!'],
    ['carrot', 'potato', 'onion', 'apple', 'An apple is a fruit, while the others are vegetables!'],
    ['water', 'milk', 'juice', 'bread', 'Bread is solid food, while the others are liquids!'],
    ['eagle', 'parrot', 'sparrow', 'dog', 'A dog is a mammal, while the others are birds!'],
    ['boat', 'ship', 'submarine', 'car', 'A car drives on land, while the others move on water!'],
    ['airplane', 'helicopter', 'jet', 'bicycle', 'A bicycle travels on the ground, while the others fly in the air!'],
    ['winter', 'summer', 'spring', 'monday', 'Monday is a day of the week, while the others are seasons!'],
    ['shirt', 'jacket', 'sweater', 'shoe', 'A shoe is footwear, while the others are worn on the upper body!'],
    ['pen', 'pencil', 'marker', 'eraser', 'An eraser is used to remove writing, while the others are used to write!'],
    ['bed', 'couch', 'chair', 'television', 'A television is an electronic device, while the others are furniture for resting!'],
    ['hammer', 'screwdriver', 'wrench', 'spoon', 'A spoon is cutlery, while the others are tools!']
  ];
  const allWords = [...wordsBeginner, ...wordsMedium, ...wordsExpert, 'unicorn', 'rainbow', 'sunshine', 'octopus'];

  const usedTargets = new Set<string>();

  for (let i = 0; i < count; i++) {
    const type = i % 4;
    let attempts = 0;
    let key = '';

    if (type === 0) {
      let pair = allRhymes[0];
      while (attempts < 500) {
        attempts++;
        const pool = (difficulty === 'beginner' && attempts < 20) ? rhymesBeginner : 
                     (difficulty === 'medium' && attempts < 20) ? rhymesMedium : 
                     (difficulty === 'expert' && attempts < 20) ? rhymesExpert : allRhymes;
        pair = pool[getRandomInt(0, pool.length - 1)];
        key = `rhyme-${pair[0]}`;
        if (!usedTargets.has(key)) break;
      }
      usedTargets.add(key);

      const targetWord = pair[0];
      const rhymingWord = pair[1];
      
      const optionsSet = new Set<string>();
      optionsSet.add(rhymingWord);
      optionsSet.add(pair[2]);
      optionsSet.add(pair[3]);
      optionsSet.add(targetWord + 't');
      
      const options = Array.from(optionsSet);
      const correctIdxStr = options.indexOf(rhymingWord).toString();

      questions.push({
        id: `procedural-el-rhyme-${difficulty}-${i + 1}`,
        type: 'mcq',
        subject: 'english',
        questionText: `Which of these words rhymes with "${targetWord.toUpperCase()}"?`,
        options,
        correctAnswer: correctIdxStr,
        explanation: `The words "${targetWord}" and "${rhymingWord}" end with the same sound, so they rhyme.`,
        hint: {
          conceptClue: `Say "${targetWord}" out loud. Which option ends with the exact same sound?`,
          stepByStepClue: `Let's rhyme: "${targetWord}" rhymes with "${rhymingWord}".`
        }
      });
    } else if (type === 1) {
      let pair = allOpposites[0];
      while (attempts < 500) {
        attempts++;
        const pool = (difficulty === 'beginner' && attempts < 20) ? oppositesBeginner : 
                     (difficulty === 'medium' && attempts < 20) ? oppositesMedium : 
                     (difficulty === 'expert' && attempts < 20) ? oppositesExpert : allOpposites;
        pair = pool[getRandomInt(0, pool.length - 1)];
        key = `opp-${pair[0]}`;
        if (!usedTargets.has(key)) break;
      }
      usedTargets.add(key);

      const targetWord = pair[0];
      const oppositeWord = pair[1];

      const options = [oppositeWord, pair[2], pair[3], targetWord + 'ty'];
      const swapIdx = i % 4;
      const temp = options[0];
      options[0] = options[swapIdx];
      options[swapIdx] = temp;
      const correctIdxStrFinal = swapIdx.toString();

      questions.push({
        id: `procedural-el-opp-${difficulty}-${i + 1}`,
        type: 'mcq',
        subject: 'english',
        questionText: `What is the opposite of the word "${targetWord.toUpperCase()}"?`,
        options,
        correctAnswer: correctIdxStrFinal,
        explanation: `The opposite meaning of "${targetWord}" is "${oppositeWord}".`,
        hint: {
          conceptClue: `Think of what is reverse to "${targetWord}".`,
          stepByStepClue: `The opposite of "${targetWord}" is "${oppositeWord}".`
        }
      });
    } else if (type === 2) {
      let item = allOddOnes[0];
      while (attempts < 500) {
        attempts++;
        const pool = (difficulty === 'beginner' && attempts < 20) ? oddOnesBeginner : 
                     (difficulty === 'medium' && attempts < 20) ? oddOnesMedium : 
                     (difficulty === 'expert' && attempts < 20) ? oddOnesExpert : allOddOnes;
        item = pool[getRandomInt(0, pool.length - 1)];
        key = `odd-${item[0]}`;
        if (!usedTargets.has(key)) break;
      }
      usedTargets.add(key);

      const itemsList = [item[0], item[1], item[2], item[3]];
      const answer = item[3];
      const explanation = item[4];

      const correctIdxStr = itemsList.indexOf(answer).toString();

      questions.push({
        id: `procedural-el-odd-${difficulty}-${i + 1}`,
        type: 'mcq',
        subject: 'english',
        questionText: `Find the ODD one out among these words:`,
        options: itemsList,
        correctAnswer: correctIdxStr,
        explanation,
        hint: {
          conceptClue: `Three of these belong to the same group. Which one does not fit?`,
          stepByStepClue: `Three items are related. "${answer}" is not like the others, so it is the odd one out.`
        }
      });
    } else {
      let targetWord = allWords[0];
      while (attempts < 500) {
        attempts++;
        const pool = (difficulty === 'beginner' && attempts < 20) ? wordsBeginner : 
                     (difficulty === 'medium' && attempts < 20) ? wordsMedium : 
                     (difficulty === 'expert' && attempts < 20) ? wordsExpert : allWords;
        targetWord = pool[getRandomInt(0, pool.length - 1)];
        key = `vow-${targetWord}`;
        if (!usedTargets.has(key)) break;
      }
      usedTargets.add(key);
      
      let vowelCount = 0;
      for (const char of targetWord) {
        if ('aeiou'.includes(char)) vowelCount++;
      }

      const options = [vowelCount.toString(), (vowelCount + 1).toString(), (vowelCount - 1).toString(), (vowelCount + 2).toString()];
      const swapIdx = i % 4;
      const temp = options[0];
      options[0] = options[swapIdx];
      options[swapIdx] = temp;
      const correctIdxStrFinal = swapIdx.toString();

      questions.push({
        id: `procedural-el-vow-${difficulty}-${i + 1}`,
        type: 'mcq',
        subject: 'english',
        questionText: `How many vowels (A, E, I, O, U) are in the word "${targetWord.toUpperCase()}"?`,
        options,
        correctAnswer: correctIdxStrFinal,
        explanation: `The vowels in "${targetWord}" are: ${targetWord.split('').filter(c => 'aeiou'.includes(c)).map(c => c.toUpperCase()).join(', ')}. That makes a total of ${vowelCount} vowels.`,
        hint: {
          conceptClue: `Find all letters in "${targetWord.toUpperCase()}" that are A, E, I, O, or U.`,
          stepByStepClue: `Count them one by one. There are ${vowelCount} vowels.`
        }
      });
    }
  }
  return questions;
}

export function generateFractionQuestionsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(rand() * (max - min + 1)) + min;
  };

  const shapes = ['circle', 'square', 'rectangle'] as const;
  
  for (let i = 0; i < count; i++) {
    const isInteractive = i % 2 === 0;
    
    let segmentsArr: number[] = [];
    if (difficulty === 'beginner') {
      segmentsArr = [2, 3, 4];
    } else if (difficulty === 'medium') {
      segmentsArr = [5, 6];
    } else {
      segmentsArr = [8];
    }

    const totalSegments = segmentsArr[i % segmentsArr.length];
    const shadedTarget = (i % (totalSegments - 1)) + 1;
    const shape = shapes[i % shapes.length];

    if (isInteractive) {
      questions.push({
        id: `procedural-fs-shade-${difficulty}-${i + 1}`,
        type: 'fraction_shading',
        subject: 'fraction',
        questionText: `Shade exactly ${shadedTarget}/${totalSegments} of the ${shape}!`,
        correctAnswer: shadedTarget,
        fractionTotalSegments: totalSegments,
        fractionShadedTarget: shadedTarget,
        shapeType: shape,
        explanation: `To represent the fraction ${shadedTarget}/${totalSegments}, we need to click and color exactly ${shadedTarget} out of the ${totalSegments} equal segments.`,
        hint: {
          conceptClue: `The bottom number (${totalSegments}) is the total parts. The top number (${shadedTarget}) is how many parts you need to color.`,
          stepByStepClue: `Color exactly ${shadedTarget} segment(s) to shade ${shadedTarget}/${totalSegments} of the shape.`
        }
      });
    } else {
      const options = [`${shadedTarget}/${totalSegments}`, `1/${totalSegments}`, `${totalSegments - shadedTarget}/${totalSegments}`, `${totalSegments}/${shadedTarget}`];
      const swapIdx = i % 4;
      const temp = options[0];
      options[0] = options[swapIdx];
      options[swapIdx] = temp;
      const correctIdxStr = swapIdx.toString();

      questions.push({
        id: `procedural-fs-mcq-${difficulty}-${i + 1}`,
        type: 'mcq',
        subject: 'fraction',
        questionText: `A circle is divided into ${totalSegments} equal segments. If you color ${shadedTarget} segments, what fraction of the circle is colored?`,
        options,
        correctAnswer: correctIdxStr,
        explanation: `Since ${shadedTarget} out of ${totalSegments} equal segments are colored, the fraction representing the colored part is ${shadedTarget}/${totalSegments}.`,
        hint: {
          conceptClue: `Write the number of shaded parts over the total number of parts.`,
          stepByStepClue: `Shaded parts = ${shadedTarget}, Total parts = ${totalSegments}. So the fraction is ${shadedTarget}/${totalSegments}.`
        }
      });
    }
  }
  return questions;
}

export function generateGeneralKnowledgeQuestionsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

  const usedTargets = new Set<string>();

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let item = gkTrivia[0];
    
    while (attempts < 500) {
      attempts++;
      item = gkTrivia[getRandomInt(0, gkTrivia.length - 1)];
      if (!usedTargets.has(item.q)) break;
    }
    usedTargets.add(item.q);

    const options = [...item.opts];
    const correctIdxStr = options.indexOf(item.ans).toString();

    questions.push({
      id: `procedural-gk-${difficulty}-${i + 1}`,
      type: 'mcq',
      subject: 'general_knowledge',
      questionText: item.q,
      options,
      correctAnswer: correctIdxStr,
      explanation: item.exp,
      hint: {
        conceptClue: item.hint,
        stepByStepClue: `The correct answer is "${item.ans}".`
      }
    });
  }
  return questions;
}

export function generateScienceQuestionsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

  const usedTargets = new Set<string>();

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let item = sciTrivia[0];
    
    while (attempts < 500) {
      attempts++;
      item = sciTrivia[getRandomInt(0, sciTrivia.length - 1)];
      if (!usedTargets.has(item.q)) break;
    }
    usedTargets.add(item.q);

    const options = [...item.opts];
    const correctIdxStr = options.indexOf(item.ans).toString();

    questions.push({
      id: `procedural-sci-${difficulty}-${i + 1}`,
      type: 'mcq',
      subject: 'science',
      questionText: item.q,
      options,
      correctAnswer: correctIdxStr,
      explanation: item.exp,
      hint: {
        conceptClue: item.hint,
        stepByStepClue: `The correct answer is "${item.ans}".`
      }
    });
  }
  return questions;
}

export function generateGamesQuestionsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(rand() * (max - min + 1)) + min;
  };

  const beginnerGames = [
    {
      q: "Which sport uses a racket and a light feathered shuttlecock?",
      opts: ["Football", "Cricket", "Badminton", "Basketball"],
      ans: "Badminton",
      exp: "Badminton is played by hitting a shuttlecock back and forth over a net with rackets.",
      hint: "You hit a cone-shaped feathered shuttlecock instead of a round ball."
    },
    {
      q: "How many players are on the table in a singles match of Table Tennis?",
      opts: ["2", "4", "6", "8"],
      ans: "2",
      exp: "Singles matches are played one-on-one, making a total of two players.",
      hint: "One player stands on each side of the table tennis net."
    },
    {
      q: "Which game is played with black and white pieces on a grid board of 64 squares?",
      opts: ["Ludo", "Monopoly", "Chess", "Scrabble"],
      ans: "Chess",
      exp: "Chess is a classic tactical board game played on an 8x8 grid with 32 starting pieces.",
      hint: "It features kings, queens, knights, and rooks."
    },
    {
      q: "In football (soccer), which player is allowed to use their hands to grab the ball?",
      opts: ["Striker", "Goalkeeper", "Defender", "Referee"],
      ans: "Goalkeeper",
      exp: "The goalkeeper protects the goal and is the only player allowed to use hands inside the penalty box.",
      hint: "This player wears gloves and stands in front of the net."
    }
  ];

  const mediumGames = [
    {
      q: "In cricket, how many runs does a batsman score if they hit the ball over the boundary line without it bouncing?",
      opts: ["1 Run", "2 Runs", "4 Runs", "6 Runs"],
      ans: "6 Runs",
      exp: "Hitting the ball over the boundary rope directly scores a maximum of six runs.",
      hint: "It is the highest score you can get from a single hit in cricket."
    },
    {
      q: "Which popular board game uses a striker to pocket small round wooden coins?",
      opts: ["Carrom", "Ludo", "Chess", "Scrabble"],
      ans: "Carrom",
      exp: "Carrom is a tabletop game where players flick a heavy striker to pocket white and black coins.",
      hint: "You play it on a square wooden board with pockets in the four corners."
    },
    {
      q: "How many interlocking rings make up the official Olympic Games logo?",
      opts: ["3", "4", "5", "6"],
      ans: "5",
      exp: "The Olympic logo consists of five blue, yellow, black, green, and red rings representing the five continents.",
      hint: "Count the colored loops that represent world unity in sports."
    },
    {
      q: "Which of these is NOT a piece in the board game Chess?",
      opts: ["Knight", "Castle (Rook)", "Bishop", "Striker"],
      ans: "Striker",
      exp: "A striker is used in Carrom, whereas Chess pieces include pawns, knights, bishops, rooks, kings, and queens.",
      hint: "It is the disc you flick with your finger in Carrom."
    }
  ];

  const expertGames = [
    {
      q: "Which chess piece has the special ability to jump over other pieces?",
      opts: ["Bishop", "Rook", "Knight", "Pawn"],
      ans: "Knight",
      exp: "The Knight moves in an 'L' shape and can jump over any obstacles in its path.",
      hint: "This piece is shaped like a horse's head."
    },
    {
      q: "In which sport can you score a 'Home Run' by running around four bases?",
      opts: ["Tennis", "Baseball", "Cricket", "Golf"],
      ans: "Baseball",
      exp: "In baseball, hitting a home run allows the batter to run through first, second, third, and home base.",
      hint: "The batter uses a wooden bat to hit a small white ball and runs around a diamond path."
    },
    {
      q: "Which chess piece is the most powerful and can move any number of squares in any direction?",
      opts: ["King", "Rook", "Queen", "Bishop"],
      ans: "Queen",
      exp: "The Queen combining the moves of the Rook and Bishop makes it the most mobile and powerful chess piece.",
      hint: "She stands next to the King at the start of the game."
    },
    {
      q: "In tennis, what term is used to describe a score of zero?",
      opts: ["Nil", "Zero", "Love", "Blank"],
      ans: "Love",
      exp: "Tennis scoring traditionally uses the word 'Love' to represent a score of zero.",
      hint: "It is a word associated with affection, but means zero in a match."
    }
  ];

  for (let i = 0; i < count; i++) {
    const list = difficulty === 'beginner' ? beginnerGames : difficulty === 'medium' ? mediumGames : expertGames;
    const item = list[i % list.length];

    const options = [...item.opts];
    const correctIdxStr = options.indexOf(item.ans).toString();

    questions.push({
      id: `procedural-gm-${difficulty}-${i + 1}`,
      type: 'mcq',
      subject: 'games',
      questionText: item.q,
      options,
      correctAnswer: correctIdxStr,
      explanation: item.exp,
      hint: {
        conceptClue: item.hint,
        stepByStepClue: `The correct answer is "${item.ans}".`
      }
    });
  }
  return questions;
}

export function generateHindiQuestionsDynamic(
  count: number,
  difficulty: AbacusDifficulty,
  seed: number = 42
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let randomSeed = seed;
  const rand = () => {
    const x = Math.sin(randomSeed++) * 10000;
    return x - Math.floor(x);
  };
  const getRandomInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

  const usedTargets = new Set<string>();

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let item = hindiTrivia[0];
    
    while (attempts < 500) {
      attempts++;
      item = hindiTrivia[getRandomInt(0, hindiTrivia.length - 1)];
      if (!usedTargets.has(item.q)) break;
    }
    usedTargets.add(item.q);

    const options = [...item.opts];
    const correctIdxStr = options.indexOf(item.ans).toString();

    questions.push({
      id: `procedural-hn-${difficulty}-${i + 1}`,
      type: 'mcq',
      subject: 'hindi',
      questionText: item.q,
      options,
      correctAnswer: correctIdxStr,
      explanation: item.exp,
      hint: {
        conceptClue: item.hint,
        stepByStepClue: `The correct answer is "${item.ans}".`
      }
    });
  }
  return questions;
}


// ─── GAME GENERATORS ─────────────────────────────────────────────────

/**
 * Maze generator using recursive backtracker (DFS).
 * Returns a grid where 0=path, 1=wall, 2=start, 3=end
 */
function generateMaze(rows: number, cols: number, seed: number): number[][] {
  // Seeded RNG
  let s = seed;
  const rng = () => { s++; return Math.abs(Math.sin(s) * 10000) % 1; };

  // Initialize grid: all walls
  const grid: number[][] = Array.from({ length: rows }, () => Array(cols).fill(1));

  // Carve paths using DFS
  const carve = (r: number, c: number) => {
    grid[r][c] = 0;
    const dirs = [[0, 2], [0, -2], [2, 0], [-2, 0]];
    // Shuffle directions
    for (let i = dirs.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
    }
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
        grid[r + dr / 2][c + dc / 2] = 0; // remove wall between
        carve(nr, nc);
      }
    }
  };

  // Start carving from (1,1)
  carve(1, 1);

  // Set start and end
  grid[1][1] = 2;
  // Find a path cell near the bottom-right
  for (let r = rows - 2; r >= 0; r--) {
    for (let c = cols - 2; c >= 0; c--) {
      if (grid[r][c] === 0) {
        grid[r][c] = 3;
        return grid;
      }
    }
  }
  grid[rows - 2][cols - 2] = 3;
  return grid;
}

export function generateMazeQuestionsDynamic(
  count: number,
  difficulty: 'beginner' | 'medium' | 'expert',
  seed: number
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  const gridSize = difficulty === 'beginner' ? 7 : difficulty === 'medium' ? 9 : 11;

  for (let i = 0; i < count; i++) {
    const mazeGrid = generateMaze(gridSize, gridSize, seed + i * 100);

    questions.push({
      id: `procedural-maze-${difficulty}-${i + 1}`,
      type: 'maze',
      subject: 'games_maze',
      questionText: 'Help the cat 🐱 find its way home 🏠! Click on the path cells to trace the route.',
      correctAnswer: '1', // '1' = solved
      explanation: 'You need to find a connected path from start to end through the maze.',
      hint: {
        conceptClue: 'Start from the cat and try to move towards the house. If you get stuck, go back and try another direction!',
        stepByStepClue: 'Look at the open paths near the cat. Follow each one and see which leads closer to the house.'
      },
      mazeGrid
    });
  }
  return questions;
}

/**
 * Sliding puzzle generator. Produces solvable tile configurations.
 */
function shuffleTiles(size: number, seed: number): (string | null)[] {
  let s = seed;
  const rng = () => { s++; return Math.abs(Math.sin(s) * 10000) % 1; };

  const total = size * size;
  const tiles: (string | null)[] = [];
  for (let i = 1; i < total; i++) tiles.push(i.toString());
  tiles.push(null);

  // Fisher-Yates shuffle (but only the non-null tiles to guarantee solvability check)
  const numTiles = tiles.length - 1; // exclude null
  for (let i = numTiles - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
  // null goes to end
  const nullIdx = tiles.indexOf(null);
  [tiles[nullIdx], tiles[total - 1]] = [tiles[total - 1], tiles[nullIdx]];

  // Check solvability (count inversions)
  let inversions = 0;
  const nums = tiles.filter((t): t is string => t !== null).map(Number);
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] > nums[j]) inversions++;
    }
  }

  // For odd-sized grids, inversions must be even
  if (size % 2 === 1 && inversions % 2 !== 0) {
    // Swap first two non-null tiles
    [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
  }
  // For even-sized grids, (inversions + blankRowFromBottom) must be even
  if (size % 2 === 0) {
    const blankRow = Math.floor(tiles.indexOf(null) / size);
    const blankRowFromBottom = size - 1 - blankRow;
    if ((inversions + blankRowFromBottom) % 2 !== 0) {
      [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
    }
  }

  // Make sure it's not already solved
  const isSolved = tiles.every((t, i) => i === total - 1 ? t === null : t === (i + 1).toString());
  if (isSolved) {
    [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
  }

  return tiles;
}

export function generateSlidingPuzzleQuestionsDynamic(
  count: number,
  difficulty: 'beginner' | 'medium' | 'expert',
  seed: number
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  const size = difficulty === 'expert' ? 4 : 3;

  for (let i = 0; i < count; i++) {
    const tiles = shuffleTiles(size, seed + i * 50);

    questions.push({
      id: `procedural-puzzle-${difficulty}-${i + 1}`,
      type: 'sliding_puzzle',
      subject: 'games_puzzle',
      questionText: `Slide the tiles to put them in order from 1 to ${size * size - 1}!`,
      correctAnswer: '1', // '1' = solved
      explanation: 'Click a tile next to the empty space to slide it. Arrange all numbers in order.',
      hint: {
        conceptClue: 'Start by getting the top row in order first, then work on the next rows!',
        stepByStepClue: 'Try to move the number 1 to the top-left corner first, then number 2 next to it.'
      },
      puzzleTiles: tiles,
      puzzleSize: size
    });
  }
  return questions;
}

/**
 * Pattern match generator.
 */
export function generatePatternMatchQuestionsDynamic(
  count: number,
  difficulty: 'beginner' | 'medium' | 'expert',
  seed: number
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let s = seed;
  const rng = () => { s++; return Math.abs(Math.sin(s) * 10000) % 1; };

  // Pattern templates
  const emojiSets = [
    ['🔴', '🔵', '🟢', '🟡'],
    ['⭐', '🌙', '☀️', '💫'],
    ['🍎', '🍊', '🍇', '🍌'],
    ['🐱', '🐶', '🐰', '🐸'],
    ['❤️', '💙', '💚', '💛'],
    ['🔺', '🔵', '🟨', '🟩'],
    ['🚗', '🚌', '✈️', '🚀'],
    ['🌸', '🌻', '🌹', '🌺'],
  ];

  for (let i = 0; i < count; i++) {
    const setIdx = Math.floor(rng() * emojiSets.length);
    const emojis = emojiSets[setIdx];

    let sequence: string[];
    let answer: string;
    let patternDesc: string;

    const patternType = Math.floor(rng() * (difficulty === 'beginner' ? 2 : difficulty === 'medium' ? 3 : 4));

    if (patternType === 0) {
      // AB AB AB ? → A
      const a = emojis[Math.floor(rng() * emojis.length)];
      let b = emojis[Math.floor(rng() * emojis.length)];
      while (b === a) b = emojis[Math.floor(rng() * emojis.length)];
      sequence = [a, b, a, b, a, b, '?'];
      answer = a;
      patternDesc = 'repeating pair';
    } else if (patternType === 1) {
      // AAA BBB ? → A or B pattern
      const a = emojis[Math.floor(rng() * emojis.length)];
      let b = emojis[Math.floor(rng() * emojis.length)];
      while (b === a) b = emojis[Math.floor(rng() * emojis.length)];
      sequence = [a, a, b, b, a, a, '?'];
      answer = b;
      patternDesc = 'double repeat';
    } else if (patternType === 2) {
      // ABC ABC ? → A
      const a = emojis[0], b = emojis[1], c = emojis[2];
      sequence = [a, b, c, a, b, c, '?'];
      answer = a;
      patternDesc = 'triple repeat';
    } else {
      // ABCD ABC? → D
      const a = emojis[0], b = emojis[1], c = emojis[2], d = emojis[3];
      sequence = [a, b, c, d, a, b, c, '?'];
      answer = d;
      patternDesc = 'four-element repeat';
    }

    // Generate 4 options (including the correct answer)
    const opts = [answer];
    const available = emojis.filter(e => e !== answer);
    while (opts.length < 4 && available.length > 0) {
      const idx = Math.floor(rng() * available.length);
      opts.push(available.splice(idx, 1)[0]);
    }
    // If not enough from this set, add from another
    while (opts.length < 4) {
      const otherSet = emojiSets[Math.floor(rng() * emojiSets.length)];
      const extra = otherSet[Math.floor(rng() * otherSet.length)];
      if (!opts.includes(extra)) opts.push(extra);
    }
    // Shuffle options
    for (let j = opts.length - 1; j > 0; j--) {
      const k = Math.floor(rng() * (j + 1));
      [opts[j], opts[k]] = [opts[k], opts[j]];
    }

    const correctIdx = opts.indexOf(answer).toString();

    questions.push({
      id: `procedural-pattern-${difficulty}-${i + 1}`,
      type: 'pattern_match',
      subject: 'games_pattern',
      questionText: 'Look at the pattern below. What comes next?',
      options: opts,
      correctAnswer: correctIdx,
      explanation: `This is a ${patternDesc} pattern. The missing piece is ${answer}.`,
      hint: {
        conceptClue: 'Look at how the symbols repeat. Can you see a group that keeps coming back?',
        stepByStepClue: `Try reading the symbols out loud. Notice the pattern repeats every few items.`
      },
      patternSequence: sequence,
      patternOptions: opts
    });
  }
  return questions;
}

/**
 * Detective / Investigation game generator.
 */
export function generateDetectiveQuestionsDynamic(
  count: number,
  difficulty: 'beginner' | 'medium' | 'expert',
  seed: number
): PracticeQuestion[] {
  const questions: PracticeQuestion[] = [];
  let s = seed;
  const rng = () => { s++; return Math.abs(Math.sin(s) * 10000) % 1; };
  const getRandomInt = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min;

  const namesPool = ['Tom', 'Sara', 'Ben', 'Alex', 'Mia', 'Jake', 'Lily', 'Sam', 'Rose', 'Max', 'Zoe', 'Leo', 'Amy', 'Nia', 'Dan', 'Finn', 'Kai', 'Eva', 'Nora', 'Jack', 'Olly', 'Mila', 'Zack', 'Isla', 'Noah', 'Ruby', 'Leo', 'Nina', 'Marco', 'Vikram', 'Ananya', 'Rohan', 'Daisy', 'Caleb', 'Freya', 'Ian', 'Sasha', 'Piper', 'Hana', 'Felix', 'Devon', 'Ethan', 'Chloe', 'Liam', 'Aiden', 'Sophia', 'Lucas', 'Grace', 'Henry', 'Owen', 'Ryan', 'Ava', 'Ella', 'Maya', 'Tyler', 'Josh'];
  const emojisPool = ['👦', '👧', '🧒'];

  const crimeTemplates = [
    {
      story: "Someone ate the last cookie from the jar! Mom found cookie crumbs on one child's face.",
      question: "Who ate the cookie?",
      guiltyClue: (n: string) => `${n} has crumbs on their face`,
      innocentClues: [(n: string) => `${n} was outside playing`, (n: string) => `${n} was asleep in bed`, (n: string) => `${n} was reading a book`, (n: string) => `${n} has a clean face`]
    },
    {
      story: "A crayon drawing appeared on the wall! Only one child was near the wall when it happened.",
      question: "Who drew on the wall?",
      guiltyClue: (n: string) => `${n} has crayon on their fingers`,
      innocentClues: [(n: string) => `${n} was in the kitchen`, (n: string) => `${n} was in the garden`, (n: string) => `${n} has clean hands`, (n: string) => `${n} was taking a nap`]
    },
    {
      story: "Someone left the water tap running in the bathroom. When dad checked, only one child had wet hands.",
      question: "Who left the tap running?",
      guiltyClue: (n: string) => `${n} has wet hands`,
      innocentClues: [(n: string) => `${n} has completely dry hands`, (n: string) => `${n} was playing outside`, (n: string) => `${n} was watching TV`]
    },
    {
      story: "Someone broke a flower pot in the garden. Grandma heard a crash and ran outside.",
      question: "Who broke the flower pot?",
      guiltyClue: (n: string) => `${n} was playing ball near the pot`,
      innocentClues: [(n: string) => `${n} was inside watching TV`, (n: string) => `${n} was reading under a tree far away`, (n: string) => `${n} was asleep`]
    },
    {
      story: "Someone spilled juice on the homework! The paper is sticky and wet with orange juice.",
      question: "Who spilled juice on the homework?",
      guiltyClue: (n: string) => `${n} was drinking orange juice near the table`,
      innocentClues: [(n: string) => `${n} was drinking water`, (n: string) => `${n} was not even in the room`, (n: string) => `${n} was playing outside`]
    },
    {
      story: "Someone picked all the strawberries from the garden! Only a few stems are left.",
      question: "Who picked the strawberries?",
      guiltyClue: (n: string) => `${n} has red-stained fingers`,
      innocentClues: [(n: string) => `${n} was at their friend's house`, (n: string) => `${n} was playing video games inside`, (n: string) => `${n} hates strawberries`]
    },
    {
      story: "Someone used all the glue during art class! The glue bottle is completely empty.",
      question: "Who used all the glue?",
      guiltyClue: (n: string) => `${n} has glue all over their hands`,
      innocentClues: [(n: string) => `${n}'s project uses tape, not glue`, (n: string) => `${n} hasn't started their project yet`, (n: string) => `${n} was absent today`]
    },
    {
      story: "Someone swapped the sugar jar with salt! Dad's tea tastes terrible.",
      question: "Who swapped sugar with salt?",
      guiltyClue: (n: string) => `${n} was giggling near the kitchen counter`,
      innocentClues: [(n: string) => `${n} was playing outside`, (n: string) => `${n} was doing homework in their room`, (n: string) => `${n} doesn't know where the kitchen is`]
    },
    {
      story: "The jigsaw puzzle on the table is missing one piece! Someone has it.",
      question: "Who has the missing puzzle piece?",
      guiltyClue: (n: string) => `${n} has a puzzle piece sticking out of their pocket`,
      innocentClues: [(n: string) => `${n} is playing with blocks`, (n: string) => `${n} is drawing a picture`, (n: string) => `${n} was reading a book`]
    },
    {
      story: "Someone fed chocolate to the dog, which is bad for dogs! The dog doesn't feel well.",
      question: "Who fed chocolate to the dog?",
      guiltyClue: (n: string) => `${n} has an empty chocolate wrapper`,
      innocentClues: [(n: string) => `${n} knows chocolate is bad for dogs`, (n: string) => `${n} was at school`, (n: string) => `${n} doesn't like chocolate`]
    }
  ];

  const usedTargets = new Set<string>();

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let selectedNames: string[] = [];
    let guiltyIdx = 0;
    let crimeIdx = 0;
    let key = '';

    while (attempts < 500) {
      attempts++;
      
      // Select random unique names
      const shuffledNames = [...namesPool].sort(() => rng() - 0.5);
      const numOptions = difficulty === 'beginner' ? 3 : 4;
      selectedNames = shuffledNames.slice(0, numOptions);
      
      guiltyIdx = getRandomInt(0, numOptions - 1);
      crimeIdx = getRandomInt(0, crimeTemplates.length - 1);
      
      // Sort names alphabetically so the combination key is order-independent
      const sortedNames = [...selectedNames].sort().join('-');
      key = `${crimeIdx}-${sortedNames}-${selectedNames[guiltyIdx]}`;
      
      if (!usedTargets.has(key)) break;
    }
    
    usedTargets.add(key);

    const crime = crimeTemplates[crimeIdx];
    const emojis = selectedNames.map(() => emojisPool[getRandomInt(0, emojisPool.length - 1)]);
    
    // Generate clues based on guilty/innocent
    const clues = selectedNames.map((name, idx) => {
      if (idx === guiltyIdx) {
        return crime.guiltyClue(name);
      } else {
        const shuffledInnocent = [...crime.innocentClues].sort(() => rng() - 0.5);
        return shuffledInnocent[0](name);
      }
    });

    questions.push({
      id: `procedural-detective-${difficulty}-${i + 1}`,
      type: 'detective',
      subject: 'games_detective',
      questionText: crime.question,
      options: selectedNames,
      correctAnswer: guiltyIdx.toString(),
      explanation: `Based on the clues, ${selectedNames[guiltyIdx]} is the answer.`,
      hint: {
        conceptClue: 'Read each clue carefully. Who do the clues point to?',
        stepByStepClue: 'Go through each person and check if the clues match them. Eliminate the ones who couldn\'t have done it.'
      },
      sceneEmojis: emojis,
      sceneStory: crime.story,
      sceneClues: clues
    });
  }
  return questions;
}

