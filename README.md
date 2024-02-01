# InSound App

Ele oferece acesso a uma vasta biblioteca de músicas utilizando a [API do Deezer](https://developers.deezer.com/api), o preview oferecido é de apenas 30 segundos por cada música. Porém oferece uma experiência musical bem dinâmica, desde a descoberta de novas faixas até a criação de uma playlist personalizada.

O App foi desenvolvido com [React Native](https://reactnative.dev/), [Redux](https://redux.js.org/), [ Styled-Components](https://styled-components.com/) e utiliza [Expo](https://expo.dev/) no seu workflow.

<div>
  <img alt="img-1" src="https://i.imgur.com/3Aifa5l.jpeg" width="250em" />
  <img alt="img-2" src="https://i.imgur.com/PM4KaVk.jpeg" width="250em" />
</div>

### Principais Funcionalidades

- <b>Exploração Aberta:</b> Os usuários podem explorar o vasto catálogo de músicas, artistas e álbuns diretamente através da integração com a API do Deezer. Isso permite que eles descubram novas músicas de seus gêneros favoritos ou explorem estilos totalmente novos.
  <br />
- <b>Playlist Personalizada:</b> Permite que o usuário crie uma playlist personalizada com suas músicas favoritas. A API do Deezer oferece acesso fácil a informações detalhadas sobre faixas, o que pode ser aproveitado para mostrar ao usuário sobre o que ele está ouvindo.
  <br />
- <b>Recomendações Inteligentes:</b> Utilizando recursos de recomendação da API do Deezer, o aplicativo sugere na tela inicial músicas tendências do Brasil, eu fixei esta região para não fazer algo tão complexo, visto que é um App somente para demonstração. Mas a experiência de encontrar novos artistas ou faixas populares ainda existe.
  <br />
- <b>Busca Avançada:</b> Uma busca avançada facilita a localização rápida de artistas, álbuns ou faixas específicas, garantindo uma experiência de descoberta musical eficiente.

<div>
  <img alt="img-3" src="https://i.imgur.com/xPzTdEl.jpeg" width="250em" />
  <img alt="img-4" src="https://i.imgur.com/KBPDlzB.jpeg" width="250em" />
</div>

### Sobre a Estrutura

- React Native, por que ele oferece a capacidade de desenvolver uma base de código única para ambas as plataformas (IOS/Android), resultando em um processo de desenvolvimento mais eficiente.
  <br />
- O Expo simplifica a configuração do ambiente de desenvolvimento, permitindo que você inicie rapidamente o desenvolvimento sem a necessidade de configurar manualmente muitas dependências e fornece uma série de utilidades e facilitadores. Um diferencial é que você pode publicar seu aplicativo na loja de maneira mais eficiente.
  <br />
- O Redux foi implementado para o gerenciamento de estado, o que é crucial para manter a consistência e a eficiência do aplicativo, também utilizei a persistência de dados para que ficasse salvo no local a playlist e qual música está sendo reproduzida.
  <br />
- Styled-Components para o gerenciamento de estilos, pois possibilita a criação de componentes estilizados de maneira mais modular e reutilizável, o que contribui para um código mais organizado e fácil de manter.

### Como testar o App

Testar um aplicativo RN que utiliza o Expo é um processo simples. O Expo oferece ferramentas que facilitam o teste de aplicativos em emuladores, dispositivos físicos e até mesmo online. Aqui estão algumas opções:

1. Certifique-se de ter o Expo CLI instalado. Se não tiver, instale-o globalmente com `npm install -g expo-cli`.
   <br />
2. Clone o código do App e no diretório do projeto, execute `yarn instal` ou `expo start` no terminal para iniciar o servidor de desenvolvimento.
   <br />
3. Use o Expo Go, emuladores ou [Expo Snack](https://snack.expo.dev/) para testar seu aplicativo.
   Lembre-se de que o Expo facilita o teste em dispositivos reais usando o Expo Go. Para testar em emuladores, você pode precisar configurar as ferramentas de desenvolvimento específicas para iOS (Xcode) ou Android (Android Studio).
