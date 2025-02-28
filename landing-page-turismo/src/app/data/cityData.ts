export interface City {
  name: string;
  province: string;
  score: number;
}

export const cities: City[] = [
  // TRAPANI
  { name: 'Alcamo', province: 'TP', score: 3 },
  { name: 'Buseto Palizzolo', province: 'TP', score: 6 },
  { name: 'Calatafimi-Segesta', province: 'TP', score: 6 },
  { name: 'Campobello di Mazara', province: 'TP', score: 0 },
  { name: 'Castellammare del Golfo', province: 'TP', score: 3 },
  { name: 'Castelvetrano', province: 'TP', score: 3 },
  { name: 'Custonaci', province: 'TP', score: 3 },
  { name: 'Erice', province: 'TP', score: 0 },
  { name: 'Favignana', province: 'TP', score: 6 },
  { name: 'Gibellina', province: 'TP', score: 6 },
  { name: 'Marsala', province: 'TP', score: 0 },
  { name: 'Mazara del Vallo', province: 'TP', score: 3 },
  { name: 'Misiliscemi', province: 'TP', score: 6 },
  { name: 'Paceco', province: 'TP', score: 3 },
  { name: 'Pantelleria', province: 'TP', score: 6 },
  { name: 'Partanna', province: 'TP', score: 6 },
  { name: 'Poggioreale', province: 'TP', score: 6 },
  { name: 'Salaparuta', province: 'TP', score: 6 },
  { name: 'Salemi', province: 'TP', score: 6 },
  { name: 'Santa Ninfa', province: 'TP', score: 6 },
  { name: 'San Vito Lo Capo', province: 'TP', score: 3 },
  { name: 'Trapani', province: 'TP', score: 0 },
  { name: 'Valderice', province: 'TP', score: 0 },
  { name: 'Vita', province: 'TP', score: 3 },
  { name: 'Petrosino', province: 'TP', score: 0 },

  // PALERMO
  { name: 'Palermo', province: 'PA', score: 0 },
  { name: 'Ustica', province: 'PA', score: 0 },
  { name: 'Alia', province: 'PA', score: 6 },
  { name: 'Alimena', province: 'PA', score: 6 },
  { name: 'Aliminusa', province: 'PA', score: 6 },
  { name: 'Altavilla Milicia', province: 'PA', score: 0 },
  { name: 'Altofonte', province: 'PA', score: 3 },
  { name: 'Bagheria', province: 'PA', score: 3 },
  { name: 'Balestrate', province: 'PA', score: 0 },
  { name: 'Baucina', province: 'PA', score: 6 },
  { name: 'Belmonte Mezzagno', province: 'PA', score: 3 },
  { name: 'Bisacquino', province: 'PA', score: 6 },
  { name: 'Bolognetta', province: 'PA', score: 6 },
  { name: 'Bompietro', province: 'PA', score: 6 },
  { name: 'Borgetto', province: 'PA', score: 3 },
  { name: 'Caccamo', province: 'PA', score: 6 },
  { name: 'Caltavuturo', province: 'PA', score: 6 },
  { name: 'Campofelice di Fitalia', province: 'PA', score: 6 },
  { name: 'Campofelice di Roccella', province: 'PA', score: 0 },
  { name: 'Campofiorito', province: 'PA', score: 6 },
  { name: 'Camporeale', province: 'PA', score: 6 },
  { name: 'Capaci', province: 'PA', score: 3 },
  { name: 'Carini', province: 'PA', score: 3 },
  { name: 'Castelbuono', province: 'PA', score: 6 },
  { name: 'Casteldaccia', province: 'PA', score: 3 },
  { name: 'Castellana Sicula', province: 'PA', score: 6 },
  { name: 'Castronovo di Sicilia', province: 'PA', score: 6 },
  { name: 'Cefalà Diana', province: 'PA', score: 6 },
  { name: 'Cefalù', province: 'PA', score: 0 },

  // MESSINA
  { name: 'Lipari', province: 'ME', score: 6 },

  // AGRIGENTO
  { name: 'Lampedusa e Linosa', province: 'AG', score: 0 },

  // MESSINA (additional cities)
  { name: 'Alcara li Fusi', province: 'ME', score: 6 },
  { name: 'Alì', province: 'ME', score: 6 },
  { name: 'Alì Terme', province: 'ME', score: 0 },
  { name: 'Antillo', province: 'ME', score: 6 },
  { name: 'Barcellona Pozzo di Gotto', province: 'ME', score: 0 },
  { name: 'Basicò', province: 'ME', score: 6 },
  { name: 'Brolo', province: 'ME', score: 0 },
  { name: 'Capizzi', province: 'ME', score: 6 },
  { name: 'Capo d\'Orlando', province: 'ME', score: 0 },
  { name: 'Capri Leone', province: 'ME', score: 0 },
  { name: 'Caronia', province: 'ME', score: 6 },
  { name: 'Casalvecchio Siculo', province: 'ME', score: 6 },
  { name: 'Castel di Lucio', province: 'ME', score: 6 },
  { name: 'Castell\'Umberto', province: 'ME', score: 3 },
  { name: 'Castelmola', province: 'ME', score: 3 },
  { name: 'Castroreale', province: 'ME', score: 6 },
  { name: 'Cesarò', province: 'ME', score: 6 },
  { name: 'Condrò', province: 'ME', score: 6 },
  { name: 'Falcone', province: 'ME', score: 0 },
  { name: 'Ficarra', province: 'ME', score: 6 },
  { name: 'Fiumedinisi', province: 'ME', score: 6 },
  { name: 'Floresta', province: 'ME', score: 6 },
  { name: 'Fondachelli-Fantina', province: 'ME', score: 6 },
  { name: 'Forza d\'Agrò', province: 'ME', score: 3 },
  { name: 'Francavilla di Sicilia', province: 'ME', score: 6 },
  { name: 'Frazzanò', province: 'ME', score: 6 },
  { name: 'Furci Siculo', province: 'ME', score: 0 },
  { name: 'Furnari', province: 'ME', score: 0 },
  { name: 'Gaggi', province: 'ME', score: 0 },
  { name: 'Galati Mamertino', province: 'ME', score: 6 },
  { name: 'Gallodoro', province: 'ME', score: 6 },
  { name: 'Giardini-Naxos', province: 'ME', score: 0 },
  { name: 'Gioiosa Marea', province: 'ME', score: 0 },
  { name: 'Graniti', province: 'ME', score: 3 },
  { name: 'Gualtieri Sicaminò', province: 'ME', score: 6 },
  { name: 'Itala', province: 'ME', score: 6 },
  { name: 'Leni', province: 'ME', score: 6 },
  { name: 'Letojanni', province: 'ME', score: 0 },
  { name: 'Librizzi', province: 'ME', score: 6 },
  { name: 'Limina', province: 'ME', score: 6 },
  { name: 'Longi', province: 'ME', score: 6 },
  { name: 'Malfa', province: 'ME', score: 6 },
  { name: 'Malvagna', province: 'ME', score: 6 },
  { name: 'Mandanici', province: 'ME', score: 6 },
  { name: 'Mazzarrà Sant\'Andrea', province: 'ME', score: 3 },
  { name: 'Merì', province: 'ME', score: 3 },
  { name: 'Messina', province: 'ME', score: 0 },
  { name: 'Milazzo', province: 'ME', score: 0 },
  { name: 'Militello Rosmarino', province: 'ME', score: 6 },
  { name: 'Mirto', province: 'ME', score: 6 },
  { name: 'Mistretta', province: 'ME', score: 6 },
  { name: 'Moio Alcantara', province: 'ME', score: 6 },
  { name: 'Monforte San Giorgio', province: 'ME', score: 6 },
  { name: 'Mongiuffi Melia', province: 'ME', score: 6 },
  { name: 'Montagnareale', province: 'ME', score: 6 },
  { name: 'Montalbano Elicona', province: 'ME', score: 6 },
  { name: 'Motta Camastra', province: 'ME', score: 6 },
  { name: 'Motta d\'Affermo', province: 'ME', score: 6 },
  { name: 'Naso', province: 'ME', score: 6 },
  { name: 'Nizza di Sicilia', province: 'ME', score: 3 },
  { name: 'Novara di Sicilia', province: 'ME', score: 6 },
  { name: 'Oliveri', province: 'ME', score: 0 },
  { name: 'Pace del Mela', province: 'ME', score: 3 },
  { name: 'Pagliara', province: 'ME', score: 6 },
  { name: 'Patti', province: 'ME', score: 0 },
  { name: 'Pettineo', province: 'ME', score: 6 },
  { name: 'Piraino', province: 'ME', score: 0 },
  { name: 'Raccuja', province: 'ME', score: 6 },
  { name: 'Reitano', province: 'ME', score: 6 },
  { name: 'Roccafiorita', province: 'ME', score: 3 },
  { name: 'Roccalumera', province: 'ME', score: 0 },
  { name: 'Roccavaldina', province: 'ME', score: 6 },
  { name: 'Roccella Valdemone', province: 'ME', score: 6 },
  { name: 'Rodì Milici', province: 'ME', score: 6 },
  { name: 'Rometta', province: 'ME', score: 3 },
  { name: 'San Filippo del Mela', province: 'ME', score: 0 },
  { name: 'San Fratello', province: 'ME', score: 6 },
  { name: 'San Marco d\'Alunzio', province: 'ME', score: 6 },
  { name: 'San Pier Niceto', province: 'ME', score: 6 },
  { name: 'San Piero Patti', province: 'ME', score: 6 },
  { name: 'San Salvatore di Fitalia', province: 'ME', score: 6 },
  { name: 'Santa Domenica Vittoria', province: 'ME', score: 6 },
  { name: 'Sant\'Agata di Militello', province: 'ME', score: 0 },
  { name: 'Sant\'Alessio Siculo', province: 'ME', score: 0 },
  { name: 'Santa Lucia del Mela', province: 'ME', score: 6 },
  { name: 'Santa Marina Salina', province: 'ME', score: 6 },
  { name: 'Sant\'Angelo di Brolo', province: 'ME', score: 6 },
  { name: 'Santa Teresa di Riva', province: 'ME', score: 0 },
  { name: 'San Teodoro', province: 'ME', score: 6 },
  { name: 'Santo Stefano di Camastra', province: 'ME', score: 0 },
  { name: 'Saponara', province: 'ME', score: 6 },
  { name: 'Savoca', province: 'ME', score: 0 },
  { name: 'Scaletta Zanclea', province: 'ME', score: 3 },
  { name: 'Sinagra', province: 'ME', score: 6 },
  { name: 'Spadafora', province: 'ME', score: 3 },
  { name: 'Taormina', province: 'ME', score: 0 },
  { name: 'Torregrotta', province: 'ME', score: 0 },
  { name: 'Tortorici', province: 'ME', score: 6 },
  { name: 'Tripi', province: 'ME', score: 6 },
  { name: 'Tusa', province: 'ME', score: 3 },
  { name: 'Ucria', province: 'ME', score: 6 },
  { name: 'Valdina', province: 'ME', score: 3 },
  { name: 'Venetico', province: 'ME', score: 0 },
  { name: 'Villafranca Tirrena', province: 'ME', score: 0 },
  { name: 'Terme Vigliatore', province: 'ME', score: 0 },
  { name: 'Acquedolci', province: 'ME', score: 3 },
  { name: 'Torrenova', province: 'ME', score: 0 },

  // AGRIGENTO (additional cities)
  { name: 'Agrigento', province: 'AG', score: 0 },
  { name: 'Alessandria della Rocca', province: 'AG', score: 6 },
  { name: 'Aragona', province: 'AG', score: 6 },
  { name: 'Bivona', province: 'AG', score: 6 },
  { name: 'Burgio', province: 'AG', score: 6 },
  { name: 'Calamonaci', province: 'AG', score: 6 },
  { name: 'Caltabellotta', province: 'AG', score: 6 },
  { name: 'Camastra', province: 'AG', score: 6 },
  { name: 'Cammarata', province: 'AG', score: 6 },
  { name: 'Campobello di Licata', province: 'AG', score: 6 },
  { name: 'Canicattì', province: 'AG', score: 3 },
  { name: 'Casteltermini', province: 'AG', score: 6 },
  { name: 'Castrofilippo', province: 'AG', score: 6 },
  { name: 'Cattolica Eraclea', province: 'AG', score: 6 },
  { name: 'Cianciana', province: 'AG', score: 6 },
  { name: 'Comitini', province: 'AG', score: 6 },
  { name: 'Favara', province: 'AG', score: 3 },
  { name: 'Grotte', province: 'AG', score: 3 },
  { name: 'Joppolo Giancaxio', province: 'AG', score: 6 },
  { name: 'Licata', province: 'AG', score: 0 },
  { name: 'Lucca Sicula', province: 'AG', score: 6 },
  { name: 'Menfi', province: 'AG', score: 3 },
  { name: 'Montallegro', province: 'AG', score: 6 },
  { name: 'Montevago', province: 'AG', score: 6 },
  { name: 'Naro', province: 'AG', score: 6 },
  { name: 'Palma di Montechiaro', province: 'AG', score: 3 },
  { name: 'Porto Empedocle', province: 'AG', score: 0 },
  { name: 'Racalmuto', province: 'AG', score: 6 },
  { name: 'Raffadali', province: 'AG', score: 3 },
  { name: 'Ravanusa', province: 'AG', score: 3 },
  { name: 'Realmonte', province: 'AG', score: 0 },
  { name: 'Ribera', province: 'AG', score: 3 },
  { name: 'Sambuca di Sicilia', province: 'AG', score: 6 },
  { name: 'San Biagio Platani', province: 'AG', score: 6 },
  { name: 'San Giovanni Gemini', province: 'AG', score: 3 },
  { name: 'Santa Elisabetta', province: 'AG', score: 6 },
  { name: 'Santa Margherita di Belice', province: 'AG', score: 6 },
  { name: 'Sant\'Angelo Muxaro', province: 'AG', score: 6 },
  { name: 'Santo Stefano Quisquina', province: 'AG', score: 6 },
  { name: 'Sciacca', province: 'AG', score: 0 },
  { name: 'Siculiana', province: 'AG', score: 6 },
  { name: 'Villafranca Sicula', province: 'AG', score: 6 },

  // CALTANISSETTA
  { name: 'Acquaviva Platani', province: 'CL', score: 6 },
  { name: 'Bompensiere', province: 'CL', score: 6 },
  { name: 'Butera', province: 'CL', score: 6 },
  { name: 'Caltanissetta', province: 'CL', score: 6 },
  { name: 'Campofranco', province: 'CL', score: 6 },
  { name: 'Delia', province: 'CL', score: 3 },
  { name: 'Gela', province: 'CL', score: 3 },
  { name: 'Marianopoli', province: 'CL', score: 6 },
  { name: 'Mazzarino', province: 'CL', score: 6 },
  { name: 'Milena', province: 'CL', score: 6 },
  { name: 'Montedoro', province: 'CL', score: 6 },
  { name: 'Mussomeli', province: 'CL', score: 6 },
  { name: 'Niscemi', province: 'CL', score: 3 },
  { name: 'Resuttano', province: 'CL', score: 6 },
  { name: 'Riesi', province: 'CL', score: 3 },
  { name: 'San Cataldo', province: 'CL', score: 3 },
  { name: 'Santa Caterina Villarmosa', province: 'CL', score: 6 },
  { name: 'Serradifalco', province: 'CL', score: 6 },
  { name: 'Sommatino', province: 'CL', score: 3 },
  { name: 'Sutera', province: 'CL', score: 6 },
  { name: 'Vallelunga Pratameno', province: 'CL', score: 6 },
  { name: 'Villalba', province: 'CL', score: 6 },

  // ENNA
  { name: 'Agira', province: 'EN', score: 6 },
  { name: 'Aidone', province: 'EN', score: 6 },
  { name: 'Assoro', province: 'EN', score: 6 },
  { name: 'Barrafranca', province: 'EN', score: 3 },
  { name: 'Calascibetta', province: 'EN', score: 6 },
  { name: 'Catenanuova', province: 'EN', score: 3 },
  { name: 'Centuripe', province: 'EN', score: 6 },
  { name: 'Cerami', province: 'EN', score: 6 },
  { name: 'Enna', province: 'EN', score: 6 },
  { name: 'Gagliano Castelferrato', province: 'EN', score: 6 },
  { name: 'Leonforte', province: 'EN', score: 6 },
  { name: 'Nicosia', province: 'EN', score: 6 },
  { name: 'Nissoria', province: 'EN', score: 6 },
  { name: 'Piazza Armerina', province: 'EN', score: 6 },
  { name: 'Pietraperzia', province: 'EN', score: 6 },
  { name: 'Regalbuto', province: 'EN', score: 6 },
  { name: 'Sperlinga', province: 'EN', score: 6 },
  { name: 'Troina', province: 'EN', score: 6 },
  { name: 'Valguarnera Caropepe', province: 'EN', score: 3 },
  { name: 'Villarosa', province: 'EN', score: 6 },

  // CATANIA
  { name: 'Aci Bonaccorsi', province: 'CT', score: 3 },
  { name: 'Aci Castello', province: 'CT', score: 0 },
  { name: 'Aci Catena', province: 'CT', score: 3 },
  { name: 'Acireale', province: 'CT', score: 0 },
  { name: 'Aci Sant\'Antonio', province: 'CT', score: 3 },
  { name: 'Adrano', province: 'CT', score: 3 },
  { name: 'Belpasso', province: 'CT', score: 3 },
  { name: 'Biancavilla', province: 'CT', score: 3 },
  { name: 'Bronte', province: 'CT', score: 6 },
  { name: 'Calatabiano', province: 'CT', score: 0 },
  { name: 'Caltagirone', province: 'CT', score: 6 },
  { name: 'Camporotondo Etneo', province: 'CT', score: 3 },
  { name: 'Castel di Iudica', province: 'CT', score: 6 },
  { name: 'Castiglione di Sicilia', province: 'CT', score: 6 },
  { name: 'Catania', province: 'CT', score: 0 },
  { name: 'Fiumefreddo di Sicilia', province: 'CT', score: 3 },
  { name: 'Giarre', province: 'CT', score: 0 },
  { name: 'Grammichele', province: 'CT', score: 3 },
  { name: 'Gravina di Catania', province: 'CT', score: 3 },
  { name: 'Licodia Eubea', province: 'CT', score: 6 },
  { name: 'Linguaglossa', province: 'CT', score: 6 },
  { name: 'Maletto', province: 'CT', score: 6 },
  { name: 'Mascali', province: 'CT', score: 0 },
  { name: 'Mascalucia', province: 'CT', score: 0 },
  { name: 'Militello in Val di Catania', province: 'CT', score: 6 },
  { name: 'Milo', province: 'CT', score: 6 },
  { name: 'Mineo', province: 'CT', score: 6 },
  { name: 'Mirabella Imbaccari', province: 'CT', score: 3 },
  { name: 'Misterbianco', province: 'CT', score: 3 },
  { name: 'Motta Sant\'Anastasia', province: 'CT', score: 0 },
  { name: 'Nicolosi', province: 'CT', score: 0 },
  { name: 'Palagonia', province: 'CT', score: 3 },
  { name: 'Paternò', province: 'CT', score: 3 },
  { name: 'Pedara', province: 'CT', score: 0 },
  { name: 'Piedimonte Etneo', province: 'CT', score: 6 },
  { name: 'Raddusa', province: 'CT', score: 6 },
  { name: 'Ramacca', province: 'CT', score: 6 },
  { name: 'Randazzo', province: 'CT', score: 6 },
  { name: 'Riposto', province: 'CT', score: 0 },
  { name: 'San Cono', province: 'CT', score: 3 },
  { name: 'San Giovanni la Punta', province: 'CT', score: 0 },
  { name: 'San Gregorio di Catania', province: 'CT', score: 0 },
  { name: 'San Michele di Ganzaria', province: 'CT', score: 6 },
  { name: 'San Pietro Clarenza', province: 'CT', score: 3 },
  { name: 'Sant\'Agata li Battiati', province: 'CT', score: 3 },
  { name: 'Sant\'Alfio', province: 'CT', score: 6 },
  { name: 'Santa Maria di Licodia', province: 'CT', score: 3 },
  { name: 'Santa Venerina', province: 'CT', score: 0 },
  { name: 'Scordia', province: 'CT', score: 3 },
  { name: 'Trecastagni', province: 'CT', score: 3 },
  { name: 'Tremestieri Etneo', province: 'CT', score: 3 },
  { name: 'Valverde', province: 'CT', score: 3 },
  { name: 'Viagrande', province: 'CT', score: 0 },
  { name: 'Vizzini', province: 'CT', score: 6 },
  { name: 'Zafferana Etnea', province: 'CT', score: 6 },
  { name: 'Mazzarrone', province: 'CT', score: 6 },
  { name: 'Maniace', province: 'CT', score: 6 },
  { name: 'Ragalna', province: 'CT', score: 6 },

  // RAGUSA
  { name: 'Acate', province: 'RG', score: 6 },
  { name: 'Chiaramonte Gulfi', province: 'RG', score: 6 },
  { name: 'Comiso', province: 'RG', score: 3 },
  { name: 'Giarratana', province: 'RG', score: 6 },
  { name: 'Ispica', province: 'RG', score: 3 },
  { name: 'Modica', province: 'RG', score: 0 },
  { name: 'Monterosso Almo', province: 'RG', score: 6 },
  { name: 'Pozzallo', province: 'RG', score: 0 },
  { name: 'Ragusa', province: 'RG', score: 0 },
  { name: 'Santa Croce Camerina', province: 'RG', score: 0 },
  { name: 'Scicli', province: 'RG', score: 0 },
  { name: 'Vittoria', province: 'RG', score: 3 },

  // SIRACUSA
  { name: 'Augusta', province: 'SR', score: 3 },
  { name: 'Avola', province: 'SR', score: 0 },
  { name: 'Buccheri', province: 'SR', score: 6 },
  { name: 'Buscemi', province: 'SR', score: 6 },
  { name: 'Canicattini Bagni', province: 'SR', score: 3 },
  { name: 'Carlentini', province: 'SR', score: 6 },
  { name: 'Cassaro', province: 'SR', score: 6 },
  { name: 'Ferla', province: 'SR', score: 6 },
  { name: 'Floridia', province: 'SR', score: 3 },
  { name: 'Francofonte', province: 'SR', score: 3 },
  { name: 'Lentini', province: 'SR', score: 6 },
  { name: 'Melilli', province: 'SR', score: 6 },
  { name: 'Noto', province: 'SR', score: 3 },
  { name: 'Pachino', province: 'SR', score: 0 },
  { name: 'Palazzolo Acreide', province: 'SR', score: 6 },
  { name: 'Rosolini', province: 'SR', score: 3 },
  { name: 'Siracusa', province: 'SR', score: 0 },
  { name: 'Solarino', province: 'SR', score: 3 },
  { name: 'Sortino', province: 'SR', score: 6 },
  { name: 'Portopalo di Capo Passero', province: 'SR', score: 0 },
  { name: 'Priolo Gargallo', province: 'SR', score: 3 }
];

// Helper per raggruppare le città per provincia
export const getCitiesByProvince = () => {
  return cities.reduce((acc, city) => {
    if (!acc[city.province]) {
      acc[city.province] = [];
    }
    acc[city.province].push(city);
    return acc;
  }, {} as Record<string, City[]>);
};

// Helper per ottenere il punteggio della città
export const getCityScore = (city: City): number => {
  return city.score;
};

// Helper per la ricerca delle città
export const searchCities = (query: string): City[] => {
  const normalizedQuery = query.toLowerCase();
  return cities.filter(city => 
    city.name.toLowerCase().includes(normalizedQuery) ||
    city.province.toLowerCase().includes(normalizedQuery)
  );
}; 