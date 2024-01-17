import { Box } from "@components/Box";
import { Container } from "@components/Container";
import { InputText } from "@components/InputText";

export const Home = () => {
  return (
    <Container>
      <Box p={"cake"}>
        <InputText
          label={"teste"}
          placeholder="Buscar  música..."
          onChangeText={(value) => {
            console.log(value);
          }}
        />
      </Box>
    </Container>
  );
};
