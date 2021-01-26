const func = {
  getJpDay(key) {
    const jpDays = {
      Monday: "月",
      Tuesday: "火",
      Wednesday: "水",
      Thursday: "木",
      Friday: "金",
      Saturday: "土",
      Sunday: "日"
    };
    return jpDays[key];
  }
};

export default func;