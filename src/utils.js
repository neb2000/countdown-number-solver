export const getOccurrences = (numbers) => {
  return numbers.reduce((list, number) => {
    list[number] ? ++list[number] : list[number] = 1
    return list;
  }, {});
}

export const handleFocus = (event) => event.target.select();
