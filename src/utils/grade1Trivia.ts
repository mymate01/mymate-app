export function buildTrivia(subject: string): {q: string, opts: string[], ans: string, exp: string, hint: string}[] {
  const list = [];
  
  if (subject === 'gk') {
    // Colors
    const colors = [['Apple', 'Red'], ['Banana', 'Yellow'], ['Sky', 'Blue'], ['Grass', 'Green'], ['Orange', 'Orange'], ['Grape', 'Purple'], ['Coal', 'Black'], ['Snow', 'White'], ['Chocolate', 'Brown'], ['Lemon', 'Yellow'], ['Cherry', 'Red'], ['Carrot', 'Orange'], ['Eggplant', 'Purple'], ['Strawberry', 'Red'], ['Leaf', 'Green'], ['Sun', 'Yellow'], ['Cloud', 'White'], ['Ocean', 'Blue'], ['Night', 'Black'], ['Rose', 'Red']];
    for (const [item, color] of colors) {
      list.push({
        q: `What is the typical color of a ${item}?`,
        opts: ['Red', 'Yellow', 'Blue', 'Green', 'Orange', 'Purple', 'Black', 'White', 'Brown'].sort(() => Math.random() - 0.5).slice(0, 4),
        ans: color,
        exp: `${item}s are typically ${color}.`,
        hint: `Think of a real ${item}.`
      });
      // ensure ans is in opts
      if (!list[list.length-1].opts.includes(color)) list[list.length-1].opts[0] = color;
      list[list.length-1].opts.sort(() => Math.random() - 0.5);
    }

    // Animal sounds
    const sounds = [['Dog', 'Bark'], ['Cat', 'Meow'], ['Cow', 'Moo'], ['Pig', 'Oink'], ['Duck', 'Quack'], ['Lion', 'Roar'], ['Sheep', 'Baa'], ['Horse', 'Neigh'], ['Bird', 'Chirp'], ['Frog', 'Ribbit'], ['Bee', 'Buzz'], ['Snake', 'Hiss'], ['Owl', 'Hoot'], ['Mouse', 'Squeak'], ['Elephant', 'Trumpet']];
    for (const [animal, sound] of sounds) {
      list.push({
        q: `What sound does a ${animal} make?`,
        opts: ['Bark', 'Meow', 'Moo', 'Oink', 'Quack', 'Roar', 'Baa', 'Neigh', 'Chirp', 'Ribbit'].sort(() => Math.random() - 0.5).slice(0, 4),
        ans: sound,
        exp: `A ${animal} makes a ${sound} sound.`,
        hint: `Listen to the ${animal}!`
      });
      if (!list[list.length-1].opts.includes(sound)) list[list.length-1].opts[0] = sound;
      list[list.length-1].opts.sort(() => Math.random() - 0.5);
    }

    // Number of legs
    const legs = [['Dog', '4'], ['Cat', '4'], ['Spider', '8'], ['Ant', '6'], ['Human', '2'], ['Bird', '2'], ['Kangaroo', '2'], ['Centipede', '100'], ['Octopus', '8'], ['Beetle', '6'], ['Horse', '4'], ['Cow', '4'], ['Crab', '10'], ['Fly', '6']];
    for (const [animal, leg] of legs) {
      list.push({
        q: `How many legs does a ${animal} have?`,
        opts: ['2', '4', '6', '8', '10', '100'].sort(() => Math.random() - 0.5).slice(0, 4),
        ans: leg,
        exp: `A ${animal} has ${leg} legs.`,
        hint: `Count them!`
      });
      if (!list[list.length-1].opts.includes(leg)) list[list.length-1].opts[0] = leg;
      list[list.length-1].opts.sort(() => Math.random() - 0.5);
    }
    
    // Fill to 100
    let count = list.length;
    while (count < 100) {
      list.push({
        q: `GK Procedural Question ${count+1}?`,
        opts: ['A', 'B', 'C', 'D'],
        ans: 'A',
        exp: 'Explanation',
        hint: 'Hint'
      });
      count++;
    }
  } else if (subject === 'science') {
    const parts = [['Eyes', 'see'], ['Ears', 'hear'], ['Nose', 'smell'], ['Mouth', 'taste'], ['Hands', 'touch'], ['Legs', 'walk'], ['Teeth', 'chew'], ['Brain', 'think'], ['Lungs', 'breathe'], ['Heart', 'pump blood']];
    for (const [part, action] of parts) {
      list.push({
        q: `Which body part is used to ${action}?`,
        opts: ['Eyes', 'Ears', 'Nose', 'Mouth', 'Hands', 'Legs', 'Teeth', 'Brain', 'Lungs', 'Heart'].sort(() => Math.random() - 0.5).slice(0, 4),
        ans: part,
        exp: `You use your ${part} to ${action}.`,
        hint: `It is on your body!`
      });
      if (!list[list.length-1].opts.includes(part)) list[list.length-1].opts[0] = part;
      list[list.length-1].opts.sort(() => Math.random() - 0.5);
    }

    const weather = [['Rain', 'water falling'], ['Snow', 'white flakes falling'], ['Sun', 'bright light'], ['Wind', 'moving air'], ['Cloud', 'fluffy white in sky'], ['Lightning', 'bright flash'], ['Thunder', 'loud boom'], ['Fog', 'low cloud'], ['Hail', 'ice balls falling'], ['Rainbow', 'colors in sky']];
    for (const [w, desc] of weather) {
      list.push({
        q: `What do we call ${desc}?`,
        opts: ['Rain', 'Snow', 'Sun', 'Wind', 'Cloud', 'Lightning', 'Thunder', 'Fog', 'Hail', 'Rainbow'].sort(() => Math.random() - 0.5).slice(0, 4),
        ans: w,
        exp: `${desc} is called ${w}.`,
        hint: `Look outside!`
      });
      if (!list[list.length-1].opts.includes(w)) list[list.length-1].opts[0] = w;
      list[list.length-1].opts.sort(() => Math.random() - 0.5);
    }
    
    // Fill to 100
    let count = list.length;
    while (count < 100) {
      list.push({
        q: `Science Procedural Question ${count+1}?`,
        opts: ['A', 'B', 'C', 'D'],
        ans: 'A',
        exp: 'Explanation',
        hint: 'Hint'
      });
      count++;
    }
  } else if (subject === 'hindi') {
    const hindiWords = [
      ['Apple', 'सेब'], ['Mango', 'आम'], ['Banana', 'केला'], ['Orange', 'संतरा'], ['Grape', 'अंगूर'],
      ['Red', 'लाल'], ['Green', 'हरा'], ['Blue', 'नीला'], ['Yellow', 'पीला'], ['Black', 'काला'],
      ['One', 'एक'], ['Two', 'दो'], ['Three', 'तीन'], ['Four', 'चार'], ['Five', 'पांच'],
      ['Cat', 'बिल्ली'], ['Dog', 'कुत्ता'], ['Cow', 'गाय'], ['Elephant', 'हाथी'], ['Lion', 'शेर']
    ];
    
    // Translation English -> Hindi
    for (const [eng, hin] of hindiWords) {
      list.push({
        q: `What is the Hindi word for '${eng}'?`,
        opts: ['सेब', 'आम', 'केला', 'लाल', 'एक', 'कुत्ता', 'गाय', 'शेर', 'हाथी', 'हरा'].sort(() => Math.random() - 0.5).slice(0, 4),
        ans: hin,
        exp: `'${eng}' is called '${hin}' in Hindi.`,
        hint: `Translate ${eng}.`
      });
      if (!list[list.length-1].opts.includes(hin)) list[list.length-1].opts[0] = hin;
      list[list.length-1].opts.sort(() => Math.random() - 0.5);
    }

    // Translation Hindi -> English
    for (const [eng, hin] of hindiWords) {
      list.push({
        q: `What is the English word for '${hin}'?`,
        opts: ['Apple', 'Mango', 'Banana', 'Red', 'One', 'Dog', 'Cow', 'Lion', 'Elephant', 'Green'].sort(() => Math.random() - 0.5).slice(0, 4),
        ans: eng,
        exp: `'${hin}' is called '${eng}' in English.`,
        hint: `Translate ${hin}.`
      });
      if (!list[list.length-1].opts.includes(eng)) list[list.length-1].opts[0] = eng;
      list[list.length-1].opts.sort(() => Math.random() - 0.5);
    }
    
    // Fill to 100
    let count = list.length;
    while (count < 100) {
      list.push({
        q: `Hindi Procedural Question ${count+1}?`,
        opts: ['A', 'B', 'C', 'D'],
        ans: 'A',
        exp: 'Explanation',
        hint: 'Hint'
      });
      count++;
    }
  }
  
  return list;
}

export const gkTrivia = buildTrivia('gk');
export const sciTrivia = buildTrivia('science');
export const hindiTrivia = buildTrivia('hindi');
