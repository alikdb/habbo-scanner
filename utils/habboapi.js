export const hotels = ["com.tr", "com.br", "com", "es", "fi", "fr", "it", "nl", "de"];

export const getHabbo = async (username, hotel = "com.tr") => {
  if (!hotels.includes(hotel)) {
    throw new Error("Invalid hotel");
  }

  const response = await fetch(`https://www.habbo.${hotel}/api/public/users?name=${username}`);
  const data = await response.json();

  if (data.error && data.error === "not-found") {
    throw new Error("User not found");
  }
  return data;
};

export const getFullHabbo = async (uniqueId) => {
  const response = await fetch(`https://www.habbo.com/api/public/users/${uniqueId}/profile`);
  const data = await response.json();
  if (data.error && data.error === "not-found") {
    throw new Error("User not found");
  }
  return data;
};
