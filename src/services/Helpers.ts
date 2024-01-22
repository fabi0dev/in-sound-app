const helpers = {
  getWelcome: () => {
    const d = new Date();
    const hour = d.getHours();

    if (hour >= 18 || hour <= 5) {
      return "Olá, boa noite!";
    }

    if (hour >= 6 || hour <= 11) {
      return "Olá, bom dia!";
    }

    if (hour >= 12 || hour <= 17) {
      return "Olá, boa tarde!";
    }
  },
};

export { helpers };
