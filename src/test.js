const answers = {
    1: ['123'],
    2: ['12dfdf3', '1sdsd23'],
    3: ['1asd23', '1xczxc23'],
    4: ['12rerer3', '1v23'],
    5: ['1343423', '12vcvcv3'],
    6: ['qwerry']
}

const answers1 = {
    7: ['123']
}

console.log({...answers, ...answers1});

Object.entries(answers).forEach(answer => {
    let key = answer[0];
    let value = answer[1].join(', ');
    console.log(key, value);
});
