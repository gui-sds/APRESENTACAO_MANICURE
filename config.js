// Dados reais da manicure. O número deve incluir país + DDD, sem sinais.
window.STUDIO_CONFIG = {
  whatsapp: "5546999388089",
  instagram: "https://www.instagram.com/gs.rise/",
  address: "Av. Batel, 233 — Bairro das Torres",
  city: "Dois Vizinhos - PR",
  mapsUrl: "", // Opcional: link do estabelecimento no Google Maps
  openingHours: "",
  // Horários ilustrativos: preferências de solicitação, não vagas confirmadas.
  workingDays: [1, 2, 3, 4, 5, 6], // Domingo = 0
  timeSlots: [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ],
  services: [
    {
      id: "manicure",
      name: "Manicure tradicional",
      description: "Cuidado e esmaltação para valorizar suas unhas naturais.",
      duration: 45,
      price: null,
    },
    {
      id: "gel",
      name: "Esmaltação em gel",
      description: "Cor, brilho e um acabamento que acompanha sua rotina.",
      duration: 60,
      price: null,
    },
    {
      id: "alongamento",
      name: "Alongamento",
      description: "Comprimento e formato para expressar o seu estilo.",
      duration: 120,
      price: null,
    },
    {
      id: "manutencao",
      name: "Manutenção",
      description: "Um novo cuidado para o seu alongamento.",
      duration: 90,
      price: null,
    },
  ],
};
