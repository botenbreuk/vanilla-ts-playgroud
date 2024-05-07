export function example() {
  function highlight(before: string[], after: string[]) {
    const returnArr: any[] = [];

    for (let i = 0; i < before.length; i++) {
      const v = before[i];

      // if match add without hightlight
      if (v === after[i]) {
        returnArr.push(v);
      } else {
        // if match add without hightlight.
        for (let j = returnArr.length; j < after.length; j++) {
          if (v !== after[j] && after[j] !== returnArr[j]) {
            returnArr.push(`<span class="highlight">${after[j]}</span>`);
          } else {
            returnArr.push(v);
            break;
          }
        }
      }
    }

    if (returnArr.length !== after.length && before.length < after.length) {
      for (let j = before.length; j < after.length; j++) {
        if (before[before.length - 1] !== after[j]) {
          returnArr.push(`<span class="highlight">${after[j]}</span>`);
        }
      }
    }

    return returnArr.join(' ');
  }

  const before = 'Test een veld';

  const test = [
    'Test een TWEEDE veld',
    'Test een MEER DAN TWEE WOORDEN veld',
    'Test een veld TWEE',
    'Test een',
    'VELD Test een',
    'VELD TWEE Test een'
  ];

  const before_arr = before.split(' ');

  // Log to console
  test.forEach(v => {
    const p = document.createElement('p');
    p.className = 'custom';
    p.innerHTML = highlight(before_arr, v.split(' '));
    document.querySelector<HTMLDivElement>('#app')!.append(p);
  });
}
