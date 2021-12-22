const euclidText = require('./euclidText')

/*
desired result: 
book1: {
  prop1: {
    text: '...',
    propsRelyingOn: [ contains previous propositions which the current propositions relies on],
    propsReliedOn:  [ contains future propositions which the current proposition will be used by ]
  },
  prop2:....
}
My current question is how to get the future propositons which the current propsitions rely on for propsReliedOn
*/

function orderEuclid(text) {
  const lowerCasedText = euclidText.replace(/(\r\n|\n|\r)/gm, "").split('BOOK ').slice(1) //regex removes newline characters that are present since text was copied and pasted from a website
  const bookObj = {} // object to keep hold of the props in each book.

  lowerCasedText.forEach((item, idx) => bookObj[`book${idx + 1}`] = item) //iterates over lowerCasedText and creates a book as a key and the associated props for that book as the values.

  //Iterates over the bookObj and sets each book's value to an object which contains each proposition as another object.
  Object.keys(bookObj).forEach(item => {
    const propObj = {}
    bookObj[item].split('Proposition').slice(1) //splitting each text in a book by the word Proposition to get each proposition's text
      .forEach((item, idx) => propObj[`prop${idx + 1}`] = {text: item, propsRelyingOn: item.match(/\[.*?\]/g), propsReliedOn: []}) 

    bookObj[item] = propObj
  })
  return bookObj
}

orderEuclid(euclidText)

/*
desired result: 
book1: {
  prop1: {
    text: '...',
    propsRelyingOn: [ contains previous propositions which the current propositions relies on],
    propsReliedOn:  [ contains future propositions which the current proposition will be used by ]
  },
  prop2:....
}
*/

/*
Current resulting console.log value from the running the function
{
  book1: {
    prop1: {
      text: ' 1.On a given finite straight line to construct an equilateral triangle.Let AB be the given finite straight line.Thus it is required to constructan equilateral triangle on the straight line AB.With centre A and distance AB let the circle BCD be described; [Post. 3] again, with centre B and distance BA let the circle ACE be described; [Post. 3] and from the point C, in which the circles cut one another, to the points A, B let the straight lines CA, CB be joined. [Post. 1] Now, since the point A is the centre of the circle CDB,AC is equal to AB. [Def. 15]Again, since the point B is the centre of the circle CAE,BC is equal to BA. [Def. 15]But CA was also proved equal to AB; therefore each of the straight lines CA, CB is equal to AB.And things which are equal to the same thing are also equal to one another; [C.N. 1]therefore CA is also equal to CB.Therefore the three straight lines CA, AB, BC are equal to one another.Therefore the triangle ABC is equilateral; and it has been constructed on the given finite straight line AB.(Being) what it was required to do.1 2 3 4 5',
      propsRelyingOn: ['[Post. 3]', '[Post. 3]', '[Post. 1]', '[Def. 15]', '[Def. 15]', '[C.N. 1]' 
      //Replaced the original Array output text with the values when I log bookObj.book1.prop1.propsRelyingOn
],
      propsReliedOn: []
    },
    prop2: {
      text: ' 2.To place at a given point (as an extremity) a straight line equal to a given straight line.Let A be the given point, and BC the given straight line.Thus it is required to place at the point A (as an extremity) a straight line equal to the given straight line BC.From the point A to the point B let the straight line AB be joined; [Post. 1] and on it let the equilateral triangle DAB be constructed. [I. 1]Let the straight lines AE, BF be produced in a straight line with DA, DB; [Post. 2] with centre B and distance BC let the circle CGH be described; [Post. 3] and again, with centre D and distance DG let the circle GKL be described. [Post. 3]Then, since the point B is the centre of the circle CGH,BC is equal to BG.Again, since the point D is the centre of the circle GKL,DL is equal to DG.And in these DA is equal to DB;therefore the remainder AL is equal to the remainder BG. [C.N. 3]But BC was also proved equal to BG;therefore each of the straight lines AL, BC is equal to BG.And things which are equal to the same thing are also equal to one another; [C.N. 1] therefore AL is also equal to BC.Therefore at the given point A the straight line AL is placed equal to the given straight line BC.(Being) what it was required to do.6 7 8',
      propsRelyingOn: [Array], //works, just logs Array in the console
      propsReliedOn: []
    },
    prop3: {
      text: ' 3.Given two unequal straight lines, to cut off from the greater a straight line equal to the less.Let AB, C be the-two given unequal straight lines, and let AB be the greater of them.Thus it is required to cut off from AB the greater a straight line equal to C the less.At the point A let AD be placed equal to the straight line C; [I. 2] and with centre A and distance AD let the circle DEF be described. [Post. 3]Now, since the point A is the centre of the circle DEF, AE is equal to AD. [Def. 15] But C is also equal to AD. Therefore each of the straight lines AE, C is equal to AD; so that AE is also equal to C. [C.N. 1]Therefore, given the two straight lines AB, C, from AB the greater AE has been cut off equal to C the less.(Being) what it was required to do.',
      propsRelyingOn: [Array], //works, just logs Array in the console
      propsReliedOn: []
    }
  },
  book2: {
    prop1: {
      text: ' 1.If there be two straight lines, and one of them be cut into any number of segments whatever, the rectangle contained by the two straight lines is equal to the rectangles contained by the uncut straight line and each of the segments. Let A, BC be two straight lines, and let BC be cut at random at the points D, E; I say that the rectangle contained by A, BC is equal to the rectangle contained by A, BD, that contained by A, DE and that contained by A, EC.For let BF be drawn from B at right angles to BC; [I. 11] let BG be made equal to A, [I. 3] through G let GH be drawn parallel to BC, [I. 31] and through D, E, C let DK, EL, CH be drawn parallel to BG.Then BH is equal to BK, DL, EH. Now BH is the rectangle A, BC, for it is contained by GB, BC, and BG is equal to A;BK is the rectangle A, BD, for it is contained by GB, BD, and BG is equal to A;and DL is the rectangle A, DE, for DK, that is BG [I. 34], is equal to A.Similarly also EH is the rectangle A, EC.Therefore the rectangle A, BC is equal to the rectangle A, BD, the rectangle A, DE and the rectangle A, EC.Therefore etc. Q. E. D. 1',
      propsRelyingOn: [Array], //works, just logs Array in the console
      propsReliedOn: []
    },
    prop2: {
      text: ' 2.If a straight line be cut at random, the rectangle contained by the whole and both of the segments is equal to the square on the whole.For let the straight line AB be cut at random at the point C; I say that the rectangle contained by AB, BC together with the rectangle contained by BA, AC is equal to the square on AB.For let the square ADEB be described on AB [I. 46], and let CF be drawn through C parallel to either AD or BE. [I. 31]Then AE is equal to AF, CE.Now AE is the square on AB;AF is the rectangle contained by BA, AC, for it is contained by DA, AC, and AD is equal to AB;and CE is the rectangle AB, BC, for BE is equal to AB.Therefore the rectangle BA, AC together with the rectangle AB, BC is equal to the square on AB.Therefore etc. Q. E. D.',
      propsRelyingOn: [Array], //works, just logs Array in the console
      propsReliedOn: []
    }
  }
}
*/

