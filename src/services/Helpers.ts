const helpers = {
  getWelcome: () => {
    const d = new Date();
    const hour = d.getHours();

    if ((hour >= 0 && hour <= 5) || (hour >= 18 && hour <= 23)) {
      return "Olá, Boa noite!";
    } else if (hour >= 6 && hour < 12) {
      return "Olá, Bom dia!";
    } else if (hour >= 12 && hour < 18) {
      return "Olá, Boa tarde!";
    }
  },
  convertMlInTime: (ml: number) => {
    const min = Math.floor((ml / 1000 / 60) << 0);
    let sec = Math.floor((ml / 1000) % 60);
    let time = `${min}:`;

    if (isNaN(sec)) {
      sec = 0;
    }

    if (sec < 10) {
      time += `0${sec}`;
    } else {
      time += `${sec}`;
    }
    return time;
  },
  getPercentTimeMusic: (totalMl: number, currentMl: number) => {
    const percent = (currentMl * 100) / totalMl;
    if (percent > 0) {
      return parseInt(percent);
    }

    return 0;
  },
};

export { helpers };
