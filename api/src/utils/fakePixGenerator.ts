export function fakePikGenerator() {
  let code = ''
  let identifier = '';

  const characters = "abcdefghijklmnopqrstwuvxyzABCDEFGHIJKLMNOPQRSTWUVXYZ123456789";

  for (let i = 0; i < 32; i++) {
    const randomNumber = Math.floor(Math.random() * characters.length)
    identifier += characters.charAt(randomNumber);
  };

  for (let i = 0; i < 500; i++) {
    const randomNumber = Math.floor(Math.random() * characters.length)
    code += characters.charAt(randomNumber);
  };

  return { code, identifier };
};
