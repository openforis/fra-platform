ALTER TABLE
country ADD COLUMN pan_european BOOLEAN;


UPDATE
  country
SET
  list_name_en = 'Afghanistan',
  full_name_en = 'The Islamic Republic of Afghanistan',
  list_name_es = 'Afganistán',
  full_name_es = 'la República Islámica del Afganistán',
  list_name_fr = 'Afghanistan',
  full_name_fr = 'la République islamique d''Afghanistan',
  list_name_ru = 'Афганистан',
  full_name_ru = 'Исламская Республика Афганистан',
  pan_european = false
WHERE
  country_iso = 'AFG';

UPDATE
  country
SET
  list_name_en = 'Albania',
  full_name_en = 'the Republic of Albania',
  list_name_es = 'Albania',
  full_name_es = 'la República de Albania',
  list_name_fr = 'Albanie',
  full_name_fr = 'la République d''Albanie',
  list_name_ru = 'Албания',
  full_name_ru = 'Республика Албания',
  pan_european = true
WHERE
  country_iso = 'ALB';

UPDATE
  country
SET
  list_name_en = 'Algeria',
  full_name_en = 'the People''s Democratic Republic of Algeria',
  list_name_es = 'Argelia',
  full_name_es = 'la República Argelina Democrática y Popular',
  list_name_fr = 'Algérie',
  full_name_fr = 'la République algérienne démocratique et populaire',
  list_name_ru = 'Алжир',
  full_name_ru = 'Алжирская Народная Демократическая Республика',
  pan_european = false
WHERE
  country_iso = 'DZA';

UPDATE
  country
SET
  list_name_en = 'American Samoa',
  full_name_en = 'American Samoa',
  list_name_es = 'Samoa Americana',
  full_name_es = 'Samoa Americana',
  list_name_fr = 'Samoa américaines',
  full_name_fr = 'les Samoa américaines',
  list_name_ru = 'Американское Самоа',
  full_name_ru = 'Американское Самоа',
  pan_european = false
WHERE
  country_iso = 'ASM';

UPDATE
  country
SET
  list_name_en = 'Andorra',
  full_name_en = 'the Principality of Andorra',
  list_name_es = 'Andorra',
  full_name_es = 'el Principado de Andorra',
  list_name_fr = 'Andorre',
  full_name_fr = 'la Principauté d''Andorre',
  list_name_ru = 'Андорра',
  full_name_ru = 'Княжество Андорра',
  pan_european = true
WHERE
  country_iso = 'AND';

UPDATE
  country
SET
  list_name_en = 'Angola',
  full_name_en = 'the Republic of Angola',
  list_name_es = 'Angola',
  full_name_es = 'la República de Angola',
  list_name_fr = 'Angola',
  full_name_fr = 'la République d''Angola',
  list_name_ru = 'Ангола',
  full_name_ru = 'Республика Ангола',
  pan_european = false
WHERE
  country_iso = 'AGO';

UPDATE
  country
SET
  list_name_en = 'Anguilla',
  full_name_en = 'Anguilla',
  list_name_es = 'Anguila',
  full_name_es = 'Anguila',
  list_name_fr = 'Anguilla',
  full_name_fr = 'Anguilla',
  list_name_ru = 'Ангилья',
  full_name_ru = 'Ангилья',
  pan_european = false
WHERE
  country_iso = 'AIA';

UPDATE
  country
SET
  list_name_en = 'Antigua and Barbuda',
  full_name_en = 'Antigua and Barbuda',
  list_name_es = 'Antigua y Barbuda',
  full_name_es = 'Antigua y Barbuda',
  list_name_fr = 'Antigua-et-Barbuda',
  full_name_fr = 'Antigua-et-Barbuda',
  list_name_ru = 'Антигуа и Барбуда',
  full_name_ru = 'Антигуа и Барбуда',
  pan_european = false
WHERE
  country_iso = 'ATG';

UPDATE
  country
SET
  list_name_en = 'Argentina',
  full_name_en = 'the Argentine Republic',
  list_name_es = 'Argentina',
  full_name_es = 'la República Argentina',
  list_name_fr = 'Argentine',
  full_name_fr = 'la République argentine',
  list_name_ru = 'Аргентина',
  full_name_ru = 'Аргентинская Республика',
  pan_european = false
WHERE
  country_iso = 'ARG';

UPDATE
  country
SET
  list_name_en = 'Armenia',
  full_name_en = 'the Republic of Armenia',
  list_name_es = 'Armenia',
  full_name_es = 'la República de Armenia',
  list_name_fr = 'Arménie',
  full_name_fr = 'la République d''Arménie',
  list_name_ru = 'Армения',
  full_name_ru = 'Республика Армения',
  pan_european = false
WHERE
  country_iso = 'ARM';

UPDATE
  country
SET
  list_name_en = 'Aruba',
  full_name_en = 'Aruba',
  list_name_es = 'Aruba',
  full_name_es = 'Aruba',
  list_name_fr = 'Aruba',
  full_name_fr = 'Aruba',
  list_name_ru = 'Аруба',
  full_name_ru = 'Аруба',
  pan_european = false
WHERE
  country_iso = 'ABW';

UPDATE
  country
SET
  list_name_en = 'Australia',
  full_name_en = 'Australia',
  list_name_es = 'Australia',
  full_name_es = 'Australia',
  list_name_fr = 'Australie',
  full_name_fr = 'l''Australie',
  list_name_ru = 'Австралия',
  full_name_ru = 'Австралия',
  pan_european = false
WHERE
  country_iso = 'AUS';

UPDATE
  country
SET
  list_name_en = 'Austria',
  full_name_en = 'the Republic of Austria',
  list_name_es = 'Austria',
  full_name_es = 'la República de Austria',
  list_name_fr = 'Autriche',
  full_name_fr = 'la République d''Autriche',
  list_name_ru = 'Австрия',
  full_name_ru = 'Австрийская Республика',
  pan_european = true
WHERE
  country_iso = 'AUT';

UPDATE
  country
SET
  list_name_en = 'Azerbaijan',
  full_name_en = 'the Republic of Azerbaijan',
  list_name_es = 'Azerbaiyán',
  full_name_es = 'la República de Azerbaiyán',
  list_name_fr = 'Azerbaïdjan',
  full_name_fr = 'la République d''Azerbaïdjan',
  list_name_ru = 'Азербайджан',
  full_name_ru = 'Азербайджанская Республика',
  pan_european = false
WHERE
  country_iso = 'AZE';

UPDATE
  country
SET
  list_name_en = 'Bahamas',
  full_name_en = 'the Commonwealth of the Bahamas',
  list_name_es = 'Bahamas',
  full_name_es = 'el Commonwealth de las Bahamas',
  list_name_fr = 'Bahamas',
  full_name_fr = 'le Commonwealth des Bahamas',
  list_name_ru = 'Багамские Острова',
  full_name_ru = 'Содружество Багамских Островов',
  pan_european = false
WHERE
  country_iso = 'BHS';

UPDATE
  country
SET
  list_name_en = 'Bahrain',
  full_name_en = 'the Kingdom of Bahrain',
  list_name_es = 'Bahrein',
  full_name_es = 'el Reino de Bahrein',
  list_name_fr = 'Bahreïn',
  full_name_fr = 'le Royaume de Bahreïn',
  list_name_ru = 'Бахрейн',
  full_name_ru = 'Королевство Бахрейн',
  pan_european = false
WHERE
  country_iso = 'BHR';

UPDATE
  country
SET
  list_name_en = 'Bangladesh',
  full_name_en = 'the People''s Republic of Bangladesh',
  list_name_es = 'Bangladesh',
  full_name_es = 'la República Popular de Bangladesh',
  list_name_fr = 'Bangladesh',
  full_name_fr = 'la République populaire du Bangladesh',
  list_name_ru = 'Бангладеш',
  full_name_ru = 'Народная Республика Бангладеш',
  pan_european = false
WHERE
  country_iso = 'BGD';

UPDATE
  country
SET
  list_name_en = 'Barbados',
  full_name_en = 'Barbados',
  list_name_es = 'Barbados',
  full_name_es = 'Barbados',
  list_name_fr = 'Barbade',
  full_name_fr = 'la Barbade',
  list_name_ru = 'Барбадос',
  full_name_ru = 'Барбадос',
  pan_european = false
WHERE
  country_iso = 'BRB';

UPDATE
  country
SET
  list_name_en = 'Belarus',
  full_name_en = 'the Republic of Belarus',
  list_name_es = 'Belarús',
  full_name_es = 'la República de Belarús',
  list_name_fr = 'Bélarus',
  full_name_fr = 'la République du Bélarus',
  list_name_ru = 'Беларусь',
  full_name_ru = 'Республика Беларусь',
  pan_european = true
WHERE
  country_iso = 'BLR';

UPDATE
  country
SET
  list_name_en = 'Belgium',
  full_name_en = 'the Kingdom of Belgium',
  list_name_es = 'Bélgica',
  full_name_es = 'el Reino de Bélgica',
  list_name_fr = 'Belgique',
  full_name_fr = 'le Royaume de Belgique',
  list_name_ru = 'Бельгия',
  full_name_ru = 'Королевство Бельгия',
  pan_european = true
WHERE
  country_iso = 'BEL';

UPDATE
  country
SET
  list_name_en = 'Belize',
  full_name_en = 'Belize',
  list_name_es = 'Belice',
  full_name_es = 'Belice',
  list_name_fr = 'Belize',
  full_name_fr = 'le Belize',
  list_name_ru = 'Белиз',
  full_name_ru = 'Белиз',
  pan_european = false
WHERE
  country_iso = 'BLZ';

UPDATE
  country
SET
  list_name_en = 'Benin',
  full_name_en = 'the Republic of Benin',
  list_name_es = 'Benin',
  full_name_es = 'la República de Benin',
  list_name_fr = 'Bénin',
  full_name_fr = 'la République du Bénin',
  list_name_ru = 'Бенин',
  full_name_ru = 'Республика Бенин',
  pan_european = false
WHERE
  country_iso = 'BEN';

UPDATE
  country
SET
  list_name_en = 'Bermuda',
  full_name_en = 'Bermuda',
  list_name_es = 'Bermudas',
  full_name_es = 'Bermudas',
  list_name_fr = 'Bermudes',
  full_name_fr = 'les Bermudes',
  list_name_ru = 'Бермудские острова',
  full_name_ru = 'Бермудские острова',
  pan_european = false
WHERE
  country_iso = 'BMU';

UPDATE
  country
SET
  list_name_en = 'Bhutan',
  full_name_en = 'the Kingdom of Bhutan',
  list_name_es = 'Bhután',
  full_name_es = 'el Reino de Bhután',
  list_name_fr = 'Bhoutan',
  full_name_fr = 'le Royaume du Bhoutan',
  list_name_ru = 'Бутан',
  full_name_ru = 'Королевство Бутан',
  pan_european = false
WHERE
  country_iso = 'BTN';

UPDATE
  country
SET
  list_name_en = 'Bolivia (Plurinational State of)',
  full_name_en = 'the Plurinational State of Bolivia',
  list_name_es = 'Bolivia (Estado Plurinacional de)',
  full_name_es = 'Estado Plurinacional de Bolivia',
  list_name_fr = 'Bolivie (État plurinational de)',
  full_name_fr = 'l''État plurinational de Bolivie',
  list_name_ru = 'Боливия (Многонациональное Государство)',
  full_name_ru = 'Многонациональное Государство Боливия',
  pan_european = false
WHERE
  country_iso = 'BOL';

UPDATE
  country
SET
  list_name_en = 'Bonaire, Sint Eustatius and Saba',
  full_name_en = 'Bonaire, Sint Eustatius and Saba',
  list_name_es = 'Bonaire, Sint Eustatius y Saba',
  full_name_es = 'Bonaire, Sint Eustatius y Saba',
  list_name_fr = 'Bonaire, Sint Eustatius et Saba',
  full_name_fr = 'Bonaire, Sint Eustatius et Saba',
  list_name_ru = 'Бонайре, Синт-Эстатиус и Саба',
  full_name_ru = 'Бонайре, Синт-Эстатиус и Саба',
  pan_european = false
WHERE
  country_iso = 'BES';

UPDATE
  country
SET
  list_name_en = 'Bosnia and Herzegovina',
  full_name_en = 'Bosnia and Herzegovina',
  list_name_es = 'Bosnia y Herzegovina',
  full_name_es = 'Bosnia y Herzegovina',
  list_name_fr = 'Bosnie-Herzégovine',
  full_name_fr = 'la Bosnie-Herzégovine',
  list_name_ru = 'Босния и Герцеговина',
  full_name_ru = 'Босния и Герцеговина',
  pan_european = true
WHERE
  country_iso = 'BIH';

UPDATE
  country
SET
  list_name_en = 'Botswana',
  full_name_en = 'the Republic of Botswana',
  list_name_es = 'Botswana',
  full_name_es = 'la República de Botswana',
  list_name_fr = 'Botswana',
  full_name_fr = 'la République du Botswana',
  list_name_ru = 'Ботсвана',
  full_name_ru = 'Республика Ботсвана',
  pan_european = false
WHERE
  country_iso = 'BWA';

UPDATE
  country
SET
  list_name_en = 'Brazil',
  full_name_en = 'the Federative Republic of Brazil',
  list_name_es = 'Brasil',
  full_name_es = 'la República Federativa del Brasil',
  list_name_fr = 'Brésil',
  full_name_fr = 'la République fédérative du Brésil',
  list_name_ru = 'Бразилия',
  full_name_ru = 'Федеративная Республика Бразилия',
  pan_european = false
WHERE
  country_iso = 'BRA';

UPDATE
  country
SET
  list_name_en = 'British Virgin Islands',
  full_name_en = 'the British Virgin Islands',
  list_name_es = 'Islas Vírgenes Británicas',
  full_name_es = 'las Islas Vírgenes Británicas',
  list_name_fr = 'Îles Vierges britanniques',
  full_name_fr = 'les Îles Vierges britanniques',
  list_name_ru = 'Британские Виргинские острова',
  full_name_ru = 'Британские Виргинские острова',
  pan_european = false
WHERE
  country_iso = 'VGB';

UPDATE
  country
SET
  list_name_en = 'Brunei Darussalam',
  full_name_en = 'Brunei Darussalam',
  list_name_es = 'Brunei Darussalam',
  full_name_es = 'Brunei Darussalam',
  list_name_fr = 'Brunéi Darussalam',
  full_name_fr = 'le Brunéi Darussalam',
  list_name_ru = 'Бруней-Даруссалам',
  full_name_ru = 'Бруней-Даруссалам',
  pan_european = false
WHERE
  country_iso = 'BRN';

UPDATE
  country
SET
  list_name_en = 'Bulgaria',
  full_name_en = 'the Republic of Bulgaria',
  list_name_es = 'Bulgaria',
  full_name_es = 'la República de Bulgaria',
  list_name_fr = 'Bulgarie',
  full_name_fr = 'la République de Bulgarie',
  list_name_ru = 'Болгария',
  full_name_ru = 'Республика Болгария',
  pan_european = true
WHERE
  country_iso = 'BGR';

UPDATE
  country
SET
  list_name_en = 'Burkina Faso',
  full_name_en = 'Burkina Faso',
  list_name_es = 'Burkina Faso',
  full_name_es = 'Burkina Faso',
  list_name_fr = 'Burkina Faso',
  full_name_fr = 'le Burkina Faso',
  list_name_ru = 'Буркина-Фасо',
  full_name_ru = 'Буркина-Фасо',
  pan_european = false
WHERE
  country_iso = 'BFA';

UPDATE
  country
SET
  list_name_en = 'Burundi',
  full_name_en = 'the Republic of Burundi',
  list_name_es = 'Burundi',
  full_name_es = 'la República de Burundi',
  list_name_fr = 'Burundi',
  full_name_fr = 'la République du Burundi',
  list_name_ru = 'Бурунди',
  full_name_ru = 'Республика Бурунди',
  pan_european = false
WHERE
  country_iso = 'BDI';

UPDATE
  country
SET
  list_name_en = 'Cabo Verde',
  full_name_en = 'Republic of Cabo Verde',
  list_name_es = 'Cabo Verde',
  full_name_es = 'la República de Cabo Verde',
  list_name_fr = 'Cabo Verde',
  full_name_fr = 'la République de Cabo Verde',
  list_name_ru = 'Кабо-Верде',
  full_name_ru = 'Республика Кабо-Верде',
  pan_european = false
WHERE
  country_iso = 'CPV';

UPDATE
  country
SET
  list_name_en = 'Cambodia',
  full_name_en = 'the Kingdom of Cambodia',
  list_name_es = 'Camboya',
  full_name_es = 'el Reino de Camboya',
  list_name_fr = 'Cambodge',
  full_name_fr = 'le Royaume du Cambodge',
  list_name_ru = 'Камбоджа',
  full_name_ru = 'Королевство Камбоджа',
  pan_european = false
WHERE
  country_iso = 'KHM';

UPDATE
  country
SET
  list_name_en = 'Cameroon',
  full_name_en = 'the Republic of Cameroon',
  list_name_es = 'Camerún',
  full_name_es = 'la República del Camerún',
  list_name_fr = 'Cameroun',
  full_name_fr = 'la République du Cameroun',
  list_name_ru = 'Камерун',
  full_name_ru = 'Республика Камерун',
  pan_european = false
WHERE
  country_iso = 'CMR';

UPDATE
  country
SET
  list_name_en = 'Canada',
  full_name_en = 'Canada',
  list_name_es = 'Canadá',
  full_name_es = 'el Canadá',
  list_name_fr = 'Canada',
  full_name_fr = 'le Canada',
  list_name_ru = 'Канада',
  full_name_ru = 'Канада',
  pan_european = false
WHERE
  country_iso = 'CAN';

UPDATE
  country
SET
  list_name_en = 'Cayman Islands',
  full_name_en = 'Cayman Islands',
  list_name_es = 'Islas Caimán ',
  full_name_es = 'las Islas Caimán ',
  list_name_fr = 'Îles Caïmanes',
  full_name_fr = 'Îles Caïmanes',
  list_name_ru = 'Каймановы острова',
  full_name_ru = 'Каймановы острова',
  pan_european = false
WHERE
  country_iso = 'CYM';

UPDATE
  country
SET
  list_name_en = 'Central African Republic',
  full_name_en = 'the Central African Republic',
  list_name_es = 'República Centroafricana',
  full_name_es = 'la República Centroafricana',
  list_name_fr = 'République centrafricaine',
  full_name_fr = 'la République centrafricaine',
  list_name_ru = 'Центральноафриканская Республика',
  full_name_ru = 'Центральноафриканская Республика',
  pan_european = false
WHERE
  country_iso = 'CAF';

UPDATE
  country
SET
  list_name_en = 'Chad',
  full_name_en = 'the Republic of Chad',
  list_name_es = 'Chad',
  full_name_es = 'la República del Chad',
  list_name_fr = 'Tchad',
  full_name_fr = 'la République du Tchad',
  list_name_ru = 'Чад',
  full_name_ru = 'Республика Чад',
  pan_european = false
WHERE
  country_iso = 'TCD';

UPDATE
  country
SET
  list_name_en = 'Chile',
  full_name_en = 'the Republic of Chile',
  list_name_es = 'Chile',
  full_name_es = 'la República de Chile',
  list_name_fr = 'Chili',
  full_name_fr = 'la République du Chili',
  list_name_ru = 'Чили',
  full_name_ru = 'Республика Чили',
  pan_european = false
WHERE
  country_iso = 'CHL';

UPDATE
  country
SET
  list_name_en = 'China',
  full_name_en = 'the People''s Republic of China',
  list_name_es = 'China',
  full_name_es = 'la República Popular China',
  list_name_fr = 'Chine',
  full_name_fr = 'la République populaire de Chine',
  list_name_ru = 'Китай',
  full_name_ru = 'Китайская Народная Республика',
  pan_european = false
WHERE
  country_iso = 'CHN';

UPDATE
  country
SET
  list_name_en = 'Colombia',
  full_name_en = 'the Republic of Colombia',
  list_name_es = 'Colombia',
  full_name_es = 'la República de Colombia',
  list_name_fr = 'Colombie',
  full_name_fr = 'la République de Colombie',
  list_name_ru = 'Колумбия',
  full_name_ru = 'Республика Колумбия',
  pan_european = false
WHERE
  country_iso = 'COL';

UPDATE
  country
SET
  list_name_en = 'Comoros',
  full_name_en = 'the Union of the Comoros',
  list_name_es = 'Comoras',
  full_name_es = 'la Unión de las Comoras',
  list_name_fr = 'Comores',
  full_name_fr = 'l''Union des Comores',
  list_name_ru = 'Коморские Острова',
  full_name_ru = 'Союз Коморских Островов',
  pan_european = false
WHERE
  country_iso = 'COM';

UPDATE
  country
SET
  list_name_en = 'Congo',
  full_name_en = 'the Republic of the Congo',
  list_name_es = 'Congo',
  full_name_es = 'la República del Congo',
  list_name_fr = 'Congo',
  full_name_fr = 'la République du Congo',
  list_name_ru = 'Конго',
  full_name_ru = 'Республика Конго',
  pan_european = false
WHERE
  country_iso = 'COG';

UPDATE
  country
SET
  list_name_en = 'Cook Islands',
  full_name_en = 'the Cook Islands',
  list_name_es = 'Islas Cook',
  full_name_es = 'las Islas Cook',
  list_name_fr = 'Îles Cook',
  full_name_fr = 'les Îles Cook',
  list_name_ru = 'Острова Кука',
  full_name_ru = 'Острова Кука',
  pan_european = false
WHERE
  country_iso = 'COK';

UPDATE
  country
SET
  list_name_en = 'Costa Rica',
  full_name_en = 'the Republic of Costa Rica',
  list_name_es = 'Costa Rica',
  full_name_es = 'la República de Costa Rica',
  list_name_fr = 'Costa Rica',
  full_name_fr = 'la République du Costa Rica',
  list_name_ru = 'Коста-Рика',
  full_name_ru = 'Республика Коста-Рика',
  pan_european = false
WHERE
  country_iso = 'CRI';

UPDATE
  country
SET
  list_name_en = 'Côte d''Ivoire',
  full_name_en = 'the Republic of Côte d''Ivoire',
  list_name_es = 'Côte d''Ivoire',
  full_name_es = 'la República de Côte d''Ivoire',
  list_name_fr = 'Côte d''Ivoire',
  full_name_fr = 'la République de Côte d''Ivoire',
  list_name_ru = 'Кот-д`Ивуар',
  full_name_ru = 'Республика Кот-д`Ивуар',
  pan_european = false
WHERE
  country_iso = 'CIV';

UPDATE
  country
SET
  list_name_en = 'Croatia',
  full_name_en = 'the Republic of Croatia',
  list_name_es = 'Croacia',
  full_name_es = 'la República de Croacia',
  list_name_fr = 'Croatie',
  full_name_fr = 'la République de Croatie',
  list_name_ru = 'Хорватия',
  full_name_ru = 'Республика Хорватия',
  pan_european = true
WHERE
  country_iso = 'HRV';

UPDATE
  country
SET
  list_name_en = 'Cuba',
  full_name_en = 'the Republic of Cuba',
  list_name_es = 'Cuba',
  full_name_es = 'la República de Cuba',
  list_name_fr = 'Cuba',
  full_name_fr = 'la République de Cuba',
  list_name_ru = 'Куба',
  full_name_ru = 'Республика Куба',
  pan_european = false
WHERE
  country_iso = 'CUB';

UPDATE
  country
SET
  list_name_en = 'Curaçao',
  full_name_en = 'Curaçao',
  list_name_es = 'Curaçao',
  full_name_es = 'Curaçao',
  list_name_fr = 'Curaçao',
  full_name_fr = 'Curaçao',
  list_name_ru = 'Кюрасао',
  full_name_ru = 'Кюрасао',
  pan_european = false
WHERE
  country_iso = 'CUW';

UPDATE
  country
SET
  list_name_en = 'Cyprus',
  full_name_en = 'the Republic of Cyprus',
  list_name_es = 'Chipre',
  full_name_es = 'la República de Chipre',
  list_name_fr = 'Chypre',
  full_name_fr = 'la République de Chypre',
  list_name_ru = 'Кипр',
  full_name_ru = 'Республика Кипр',
  pan_european = true
WHERE
  country_iso = 'CYP';

UPDATE
  country
SET
  list_name_en = 'Czechia',
  full_name_en = 'the Czech Republic',
  list_name_es = 'Chequia',
  full_name_es = 'la República Checa',
  list_name_fr = 'Tchéquie (la)',
  full_name_fr = 'la République tchèque',
  list_name_ru = 'Чехия',
  full_name_ru = 'Чешская Республика',
  pan_european = true
WHERE
  country_iso = 'CZE';

UPDATE
  country
SET
  list_name_en = 'Democratic People''s Republic of Korea',
  full_name_en = 'the Democratic People''s Republic of Korea',
  list_name_es = 'República Popular Democrática de Corea',
  full_name_es = 'la República Popular Democrática de Corea',
  list_name_fr = 'République populaire démocratique de Corée',
  full_name_fr = 'la République populaire démocratique de Corée',
  list_name_ru = 'Корейская Народно-Демократическая Республика',
  full_name_ru = 'Корейская Народно-Демократическая Республика',
  pan_european = false
WHERE
  country_iso = 'PRK';

UPDATE
  country
SET
  list_name_en = 'Democratic Republic of the Congo',
  full_name_en = 'the Democratic Republic of the Congo',
  list_name_es = 'República Democrática del Congo',
  full_name_es = 'la República Democrática del Congo',
  list_name_fr = 'République démocratique du Congo',
  full_name_fr = 'la République démocratique du Congo',
  list_name_ru = 'Демократическая Республика Конго',
  full_name_ru = 'Демократическая Республика Конго',
  pan_european = false
WHERE
  country_iso = 'COD';

UPDATE
  country
SET
  list_name_en = 'Denmark',
  full_name_en = 'the Kingdom of Denmark',
  list_name_es = 'Dinamarca',
  full_name_es = 'el Reino de Dinamarca',
  list_name_fr = 'Danemark',
  full_name_fr = 'le Royaume du Danemark',
  list_name_ru = 'Дания',
  full_name_ru = 'Королевство Дания',
  pan_european = true
WHERE
  country_iso = 'DNK';

UPDATE
  country
SET
  list_name_en = 'Djibouti',
  full_name_en = 'the Republic of Djibouti',
  list_name_es = 'Djibouti',
  full_name_es = 'la República de Djibouti',
  list_name_fr = 'Djibouti',
  full_name_fr = 'la République de Djibouti',
  list_name_ru = 'Джибути',
  full_name_ru = 'Республика Джибути',
  pan_european = false
WHERE
  country_iso = 'DJI';

UPDATE
  country
SET
  list_name_en = 'Dominica',
  full_name_en = 'the Commonwealth of Dominica',
  list_name_es = 'Dominica',
  full_name_es = 'el Commonwealth de Dominica',
  list_name_fr = 'Dominique',
  full_name_fr = 'le Commonwealth de la Dominique',
  list_name_ru = 'Доминика',
  full_name_ru = 'Содружество Доминики',
  pan_european = false
WHERE
  country_iso = 'DMA';

UPDATE
  country
SET
  list_name_en = 'Dominican Republic',
  full_name_en = 'the Dominican Republic',
  list_name_es = 'República Dominicana',
  full_name_es = 'la República Dominicana',
  list_name_fr = 'République dominicaine',
  full_name_fr = 'la République dominicaine',
  list_name_ru = 'Доминиканская Республика',
  full_name_ru = 'Доминиканская Республика',
  pan_european = false
WHERE
  country_iso = 'DOM';

UPDATE
  country
SET
  list_name_en = 'Ecuador',
  full_name_en = 'the Republic of Ecuador',
  list_name_es = 'Ecuador',
  full_name_es = 'la República del Ecuador',
  list_name_fr = 'Équateur',
  full_name_fr = 'la République de l''Équateur',
  list_name_ru = 'Эквадор',
  full_name_ru = 'Республика Эквадор',
  pan_european = false
WHERE
  country_iso = 'ECU';

UPDATE
  country
SET
  list_name_en = 'Egypt',
  full_name_en = 'the Arab Republic of Egypt',
  list_name_es = 'Egipto',
  full_name_es = 'la República Árabe de Egipto',
  list_name_fr = 'Égypte',
  full_name_fr = 'la République arabe d''Égypte',
  list_name_ru = 'Египет',
  full_name_ru = 'Арабская Республика Египет',
  pan_european = false
WHERE
  country_iso = 'EGY';

UPDATE
  country
SET
  list_name_en = 'El Salvador',
  full_name_en = 'the Republic of El Salvador',
  list_name_es = 'El Salvador',
  full_name_es = 'la República de El Salvador',
  list_name_fr = 'El Salvador',
  full_name_fr = 'la République d''El Salvador',
  list_name_ru = 'Сальвадор',
  full_name_ru = 'Республика Эль-Сальвадор',
  pan_european = false
WHERE
  country_iso = 'SLV';

UPDATE
  country
SET
  list_name_en = 'Equatorial Guinea',
  full_name_en = 'the Republic of Equatorial Guinea',
  list_name_es = 'Guinea Ecuatorial',
  full_name_es = 'la República de Guinea Ecuatorial',
  list_name_fr = 'Guinée équatoriale',
  full_name_fr = 'la République de Guinée équatoriale',
  list_name_ru = 'Экваториальная Гвинея',
  full_name_ru = 'Республика Экваториальная Гвинея',
  pan_european = false
WHERE
  country_iso = 'GNQ';

UPDATE
  country
SET
  list_name_en = 'Eritrea',
  full_name_en = 'the State of Eritrea',
  list_name_es = 'Eritrea',
  full_name_es = 'el Estado de Eritrea',
  list_name_fr = 'Érythrée',
  full_name_fr = 'l''État d''Érythrée',
  list_name_ru = 'Эритрея',
  full_name_ru = 'Государство Эритрея',
  pan_european = false
WHERE
  country_iso = 'ERI';

UPDATE
  country
SET
  list_name_en = 'Estonia',
  full_name_en = 'the Republic of Estonia',
  list_name_es = 'Estonia',
  full_name_es = 'la República de Estonia',
  list_name_fr = 'Estonie',
  full_name_fr = 'la République d''Estonie',
  list_name_ru = 'Эстония',
  full_name_ru = 'Эстонская Республика',
  pan_european = true
WHERE
  country_iso = 'EST';

UPDATE
  country
SET
  list_name_en = 'Ethiopia',
  full_name_en = 'the Federal Democratic Republic of Ethiopia',
  list_name_es = 'Etiopía',
  full_name_es = 'la República Democrática Federal de Etiopía',
  list_name_fr = 'Éthiopie',
  full_name_fr = 'la République fédérale démocratique d''Éthiopie',
  list_name_ru = 'Эфиопия',
  full_name_ru = 'Федеративная Демократическая Республика Эфиопия',
  pan_european = false
WHERE
  country_iso = 'ETH';

UPDATE
  country
SET
  list_name_en = 'Falkland Islands (Malvinas)',
  full_name_en = 'the Falkland Islands (Malvinas)',
  list_name_es = 'Islas Malvinas (Falkland Islands)',
  full_name_es = 'Islas Malvinas (Falkland Islands)',
  list_name_fr = 'Îles Falkland (Malvinas)',
  full_name_fr = 'Îles Falkland (Malvinas)',
  list_name_ru = 'Фолклендские (Мальвинские) острова',
  full_name_ru = 'Фолклендские (Мальвинские) острова',
  pan_european = false
WHERE
  country_iso = 'FLK';

UPDATE
  country
SET
  list_name_en = 'Faroe Islands (Associate Member)',
  full_name_en = 'Faroe Islands',
  list_name_es = 'Islas Feroe (Miembro Asociado)',
  full_name_es = 'las Islas Feroe',
  list_name_fr = 'Îles Féroé (Membre associé)',
  full_name_fr = 'les Îles Féroé',
  list_name_ru = 'Фарерские Острова (ассоциированный член)',
  full_name_ru = 'Фарерские Острова',
  pan_european = false
WHERE
  country_iso = 'FRO';

UPDATE
  country
SET
  list_name_en = 'Fiji',
  full_name_en = 'the Republic of Fiji',
  list_name_es = 'Fiji',
  full_name_es = 'la República de Fiji',
  list_name_fr = 'Fidji',
  full_name_fr = 'la République des Fidji',
  list_name_ru = 'Фиджи',
  full_name_ru = 'Республика Фиджи',
  pan_european = false
WHERE
  country_iso = 'FJI';

UPDATE
  country
SET
  list_name_en = 'Finland',
  full_name_en = 'the Republic of Finland',
  list_name_es = 'Finlandia',
  full_name_es = 'la República de Finlandia',
  list_name_fr = 'Finlande',
  full_name_fr = 'la République de Finlande',
  list_name_ru = 'Финляндия',
  full_name_ru = 'Финляндская Республика',
  pan_european = true
WHERE
  country_iso = 'FIN';

UPDATE
  country
SET
  list_name_en = 'France',
  full_name_en = 'the French Republic',
  list_name_es = 'Francia',
  full_name_es = 'la República Francesa',
  list_name_fr = 'France',
  full_name_fr = 'la République française',
  list_name_ru = 'Франция',
  full_name_ru = 'Французская Республика',
  pan_european = true
WHERE
  country_iso = 'FRA';

UPDATE
  country
SET
  list_name_en = 'French Guyana',
  full_name_en = 'French Guyana',
  list_name_es = 'Guayana Francesa',
  full_name_es = 'Guayana Francesa',
  list_name_fr = 'Guyane française',
  full_name_fr = 'la Guyane française',
  list_name_ru = 'Французская Гвиана',
  full_name_ru = 'Французская Гвиана',
  pan_european = false
WHERE
  country_iso = 'GUF';

UPDATE
  country
SET
  list_name_en = 'French Polynesia',
  full_name_en = 'French Polynesia',
  list_name_es = 'Polinesia Francesa',
  full_name_es = 'Polinesia Francesa',
  list_name_fr = 'Polynésie française',
  full_name_fr = 'la Polynésie française',
  list_name_ru = 'Французская Полинезия',
  full_name_ru = 'Французская Полинезия',
  pan_european = false
WHERE
  country_iso = 'PYF';

UPDATE
  country
SET
  list_name_en = 'Gabon',
  full_name_en = 'the Gabonese Republic',
  list_name_es = 'Gabón',
  full_name_es = 'la República Gabonesa',
  list_name_fr = 'Gabon',
  full_name_fr = 'la République gabonaise',
  list_name_ru = 'Габон',
  full_name_ru = 'Габонская Республика',
  pan_european = false
WHERE
  country_iso = 'GAB';

UPDATE
  country
SET
  list_name_en = 'Gambia',
  full_name_en = 'the Republic of the Gambia',
  list_name_es = 'Gambia',
  full_name_es = 'la República de Gambia',
  list_name_fr = 'Gambie',
  full_name_fr = 'la République de Gambie',
  list_name_ru = 'Гамбия',
  full_name_ru = 'Республика Гамбия',
  pan_european = false
WHERE
  country_iso = 'GMB';

UPDATE
  country
SET
  list_name_en = 'Georgia',
  full_name_en = 'Georgia',
  list_name_es = 'Georgia',
  full_name_es = 'Georgia',
  list_name_fr = 'Géorgie',
  full_name_fr = 'la Géorgie',
  list_name_ru = 'Грузия',
  full_name_ru = 'Грузия',
  pan_european = true
WHERE
  country_iso = 'GEO';

UPDATE
  country
SET
  list_name_en = 'Germany',
  full_name_en = 'the Federal Republic of Germany',
  list_name_es = 'Alemania',
  full_name_es = 'la República Federal de Alemania',
  list_name_fr = 'Allemagne',
  full_name_fr = 'la République fédérale d''Allemagne',
  list_name_ru = 'Германия',
  full_name_ru = 'Федеративная Республика Германия',
  pan_european = true
WHERE
  country_iso = 'DEU';

UPDATE
  country
SET
  list_name_en = 'Ghana',
  full_name_en = 'the Republic of Ghana',
  list_name_es = 'Ghana',
  full_name_es = 'la República de Ghana',
  list_name_fr = 'Ghana',
  full_name_fr = 'la République du Ghana',
  list_name_ru = 'Гана',
  full_name_ru = 'Республика Гана',
  pan_european = false
WHERE
  country_iso = 'GHA';

UPDATE
  country
SET
  list_name_en = 'Gibraltar',
  full_name_en = 'Gibraltar',
  list_name_es = 'Gibraltar',
  full_name_es = 'Gibraltar',
  list_name_fr = 'Gibraltar',
  full_name_fr = 'Gibraltar',
  list_name_ru = 'Гибралтар',
  full_name_ru = 'Гибралтар',
  pan_european = false
WHERE
  country_iso = 'GIB';

UPDATE
  country
SET
  list_name_en = 'Greece',
  full_name_en = 'the Hellenic Republic',
  list_name_es = 'Grecia',
  full_name_es = 'la República Helénica',
  list_name_fr = 'Grèce',
  full_name_fr = 'la République hellénique',
  list_name_ru = 'Греция',
  full_name_ru = 'Греческая Республика',
  pan_european = true
WHERE
  country_iso = 'GRC';

UPDATE
  country
SET
  list_name_en = 'Greenland',
  full_name_en = 'Greenland',
  list_name_es = 'Groenlandia',
  full_name_es = 'Groenlandia',
  list_name_fr = 'Groenland',
  full_name_fr = 'Groenland',
  list_name_ru = 'Гренландия',
  full_name_ru = 'Гренландия',
  pan_european = false
WHERE
  country_iso = 'GRL';

UPDATE
  country
SET
  list_name_en = 'Grenada',
  full_name_en = 'Grenada',
  list_name_es = 'Granada',
  full_name_es = 'Granada',
  list_name_fr = 'Grenade',
  full_name_fr = 'la Grenade',
  list_name_ru = 'Гренада',
  full_name_ru = 'Гренада',
  pan_european = false
WHERE
  country_iso = 'GRD';

UPDATE
  country
SET
  list_name_en = 'Guadeloupe',
  full_name_en = 'Guadeloupe',
  list_name_es = 'Guadalupe',
  full_name_es = 'Guadalupe',
  list_name_fr = 'Guadeloupe',
  full_name_fr = 'la Guadeloupe',
  list_name_ru = 'Гваделупа',
  full_name_ru = 'Гваделупа',
  pan_european = false
WHERE
  country_iso = 'GLP';

UPDATE
  country
SET
  list_name_en = 'Guam',
  full_name_en = 'Guam',
  list_name_es = 'Guam',
  full_name_es = 'Guam',
  list_name_fr = 'Guam',
  full_name_fr = 'Guam',
  list_name_ru = 'Гуам',
  full_name_ru = 'Гуам',
  pan_european = false
WHERE
  country_iso = 'GUM';

UPDATE
  country
SET
  list_name_en = 'Guatemala',
  full_name_en = 'the Republic of Guatemala',
  list_name_es = 'Guatemala',
  full_name_es = 'la República de Guatemala',
  list_name_fr = 'Guatemala',
  full_name_fr = 'la République du Guatemala',
  list_name_ru = 'Гватемала',
  full_name_ru = 'Республика Гватемала',
  pan_european = false
WHERE
  country_iso = 'GTM';

UPDATE
  country
SET
  list_name_en = 'Guernsey',
  full_name_en = 'Bailiwick of Guernsey',
  list_name_es = 'Isla de Guernesey',
  full_name_es = 'Isla de Guernesey',
  list_name_fr = 'Guernesey',
  full_name_fr = 'Guernesey',
  list_name_ru = 'Гернси',
  full_name_ru = 'Гернси',
  pan_european = false
WHERE
  country_iso = 'GGY';

UPDATE
  country
SET
  list_name_en = 'Guinea',
  full_name_en = 'the Republic of Guinea',
  list_name_es = 'Guinea',
  full_name_es = 'la República de Guinea',
  list_name_fr = 'Guinée',
  full_name_fr = 'la République de Guinée',
  list_name_ru = 'Гвинея',
  full_name_ru = 'Гвинейская Республика',
  pan_european = false
WHERE
  country_iso = 'GIN';

UPDATE
  country
SET
  list_name_en = 'Guinea-Bissau',
  full_name_en = 'the Republic of Guinea-Bissau',
  list_name_es = 'Guinea-Bissau',
  full_name_es = 'la República de Guinea-Bissau',
  list_name_fr = 'Guinée-Bissau',
  full_name_fr = 'la République de Guinée-Bissau',
  list_name_ru = 'Гвинея-Бисау',
  full_name_ru = 'Республика Гвинея-Бисау',
  pan_european = false
WHERE
  country_iso = 'GNB';

UPDATE
  country
SET
  list_name_en = 'Guyana',
  full_name_en = 'the Republic of Guyana',
  list_name_es = 'Guyana',
  full_name_es = 'la República de Guyana',
  list_name_fr = 'Guyana',
  full_name_fr = 'la République du Guyana',
  list_name_ru = 'Гайана',
  full_name_ru = 'Республика Гайана',
  pan_european = false
WHERE
  country_iso = 'GUY';

UPDATE
  country
SET
  list_name_en = 'Haiti',
  full_name_en = 'the Republic of Haiti',
  list_name_es = 'Haití',
  full_name_es = 'la República de Haití',
  list_name_fr = 'Haïti',
  full_name_fr = 'la République d''Haïti',
  list_name_ru = 'Гаити',
  full_name_ru = 'Республика Гаити',
  pan_european = false
WHERE
  country_iso = 'HTI';

UPDATE
  country
SET
  list_name_en = 'Holy See',
  full_name_en = 'Holy see',
  list_name_es = 'Santa Sede',
  full_name_es = 'la Santa Sede',
  list_name_fr = 'Saint-Siège',
  full_name_fr = 'le Saint-Siège',
  list_name_ru = 'Святой Престол',
  full_name_ru = 'Святой Престол',
  pan_european = true
WHERE
  country_iso = 'VAT';

UPDATE
  country
SET
  list_name_en = 'Honduras',
  full_name_en = 'the Republic of Honduras',
  list_name_es = 'Honduras',
  full_name_es = 'la República de Honduras',
  list_name_fr = 'Honduras',
  full_name_fr = 'la République du Honduras',
  list_name_ru = 'Гондурас',
  full_name_ru = 'Республика Гондурас',
  pan_european = false
WHERE
  country_iso = 'HND';

UPDATE
  country
SET
  list_name_en = 'Hungary',
  full_name_en = 'Hungary',
  list_name_es = 'Hungría',
  full_name_es = 'Hungría',
  list_name_fr = 'Hongrie',
  full_name_fr = 'la Hongrie',
  list_name_ru = 'Венгрия',
  full_name_ru = 'Венгрия',
  pan_european = true
WHERE
  country_iso = 'HUN';

UPDATE
  country
SET
  list_name_en = 'Iceland',
  full_name_en = 'the Republic of Iceland',
  list_name_es = 'Islandia',
  full_name_es = 'la República de Islandia',
  list_name_fr = 'Islande',
  full_name_fr = 'la République d''Islande',
  list_name_ru = 'Исландия',
  full_name_ru = 'Республика Исландия',
  pan_european = true
WHERE
  country_iso = 'ISL';

UPDATE
  country
SET
  list_name_en = 'India',
  full_name_en = 'the Republic of India',
  list_name_es = 'India',
  full_name_es = 'la República de la India',
  list_name_fr = 'Inde',
  full_name_fr = 'la République de l''Inde',
  list_name_ru = 'Индия',
  full_name_ru = 'Республика Индия',
  pan_european = false
WHERE
  country_iso = 'IND';

UPDATE
  country
SET
  list_name_en = 'Indonesia',
  full_name_en = 'the Republic of Indonesia',
  list_name_es = 'Indonesia',
  full_name_es = 'la República de Indonesia',
  list_name_fr = 'Indonésie',
  full_name_fr = 'la République d''Indonésie',
  list_name_ru = 'Индонезия',
  full_name_ru = 'Республика Индонезия',
  pan_european = false
WHERE
  country_iso = 'IDN';

UPDATE
  country
SET
  list_name_en = 'Iran (Islamic Republic of)',
  full_name_en = 'the Islamic Republic of Iran',
  list_name_es = 'Irán (República Islámica del)',
  full_name_es = 'la República Islámica del Irán',
  list_name_fr = 'Iran (République islamique d'')',
  full_name_fr = 'la République islamique d''Iran',
  list_name_ru = 'Иран (Исламская Республика)',
  full_name_ru = 'Исламская Республика Иран',
  pan_european = false
WHERE
  country_iso = 'IRN';

UPDATE
  country
SET
  list_name_en = 'Iraq',
  full_name_en = 'the Republic of Iraq',
  list_name_es = 'Iraq',
  full_name_es = 'la República del Iraq',
  list_name_fr = 'Iraq',
  full_name_fr = 'la République d''Iraq',
  list_name_ru = 'Ирак',
  full_name_ru = 'Республика Ирак',
  pan_european = false
WHERE
  country_iso = 'IRQ';

UPDATE
  country
SET
  list_name_en = 'Ireland',
  full_name_en = 'Ireland',
  list_name_es = 'Irlanda',
  full_name_es = 'Irlanda',
  list_name_fr = 'Irlande',
  full_name_fr = 'l''Irlande',
  list_name_ru = 'Ирландия',
  full_name_ru = 'Ирландия',
  pan_european = true
WHERE
  country_iso = 'IRL';

UPDATE
  country
SET
  list_name_en = 'Isle of Man',
  full_name_en = 'Isle of Man',
  list_name_es = 'Isla de Man',
  full_name_es = 'Isla de Man',
  list_name_fr = 'Île de Man',
  full_name_fr = 'Île de Man',
  list_name_ru = 'остров Мэн',
  full_name_ru = 'остров Мэн',
  pan_european = false
WHERE
  country_iso = 'IMN';

UPDATE
  country
SET
  list_name_en = 'Israel',
  full_name_en = 'the State of Israel',
  list_name_es = 'Israel',
  full_name_es = 'el Estado de Israel',
  list_name_fr = 'Israël',
  full_name_fr = 'l''État d''Israël',
  list_name_ru = 'Израиль',
  full_name_ru = 'Государство Израиль',
  pan_european = false
WHERE
  country_iso = 'ISR';

UPDATE
  country
SET
  list_name_en = 'Italy',
  full_name_en = 'the Republic of Italy',
  list_name_es = 'Italia',
  full_name_es = 'la República Italiana',
  list_name_fr = 'Italie',
  full_name_fr = 'la République italienne',
  list_name_ru = 'Италия',
  full_name_ru = 'Итальянская Республика',
  pan_european = true
WHERE
  country_iso = 'ITA';

UPDATE
  country
SET
  list_name_en = 'Jamaica',
  full_name_en = 'Jamaica',
  list_name_es = 'Jamaica',
  full_name_es = 'Jamaica',
  list_name_fr = 'Jamaïque',
  full_name_fr = 'la Jamaïque',
  list_name_ru = 'Ямайка',
  full_name_ru = 'Ямайка',
  pan_european = false
WHERE
  country_iso = 'JAM';

UPDATE
  country
SET
  list_name_en = 'Japan',
  full_name_en = 'Japan',
  list_name_es = 'Japón',
  full_name_es = 'el Japón',
  list_name_fr = 'Japon',
  full_name_fr = 'le Japon',
  list_name_ru = 'Япония',
  full_name_ru = 'Япония',
  pan_european = false
WHERE
  country_iso = 'JPN';

UPDATE
  country
SET
  list_name_en = 'Jersey',
  full_name_en = 'Jersey',
  list_name_es = 'Jersey',
  full_name_es = 'Jersey',
  list_name_fr = 'Jersey',
  full_name_fr = 'Jersey',
  list_name_ru = 'Джерси',
  full_name_ru = 'Джерси',
  pan_european = false
WHERE
  country_iso = 'JEY';

UPDATE
  country
SET
  list_name_en = 'Jordan',
  full_name_en = 'the Hashemite Kingdom of Jordan',
  list_name_es = 'Jordania',
  full_name_es = 'el Reino Hachemita de Jordania',
  list_name_fr = 'Jordanie',
  full_name_fr = 'le Royaume hachémite de Jordanie',
  list_name_ru = 'Иордания',
  full_name_ru = 'Иорданское Хашимитское Королевство',
  pan_european = false
WHERE
  country_iso = 'JOR';

UPDATE
  country
SET
  list_name_en = 'Kazakhstan',
  full_name_en = 'the Republic of Kazakhstan',
  list_name_es = 'Kazajstán',
  full_name_es = 'la República de Kazajstán',
  list_name_fr = 'Kazakhstan',
  full_name_fr = 'la République du Kazakhstan',
  list_name_ru = 'Казахстан',
  full_name_ru = 'Республика Казахстан',
  pan_european = false
WHERE
  country_iso = 'KAZ';

UPDATE
  country
SET
  list_name_en = 'Kenya',
  full_name_en = 'the Republic of Kenya',
  list_name_es = 'Kenya',
  full_name_es = 'la República de Kenya',
  list_name_fr = 'Kenya',
  full_name_fr = 'la République du Kenya',
  list_name_ru = 'Кения',
  full_name_ru = 'Республика Кения',
  pan_european = false
WHERE
  country_iso = 'KEN';

UPDATE
  country
SET
  list_name_en = 'Kiribati',
  full_name_en = 'the Republic of Kiribati',
  list_name_es = 'Kiribati',
  full_name_es = 'la República de Kiribati',
  list_name_fr = 'Kiribati',
  full_name_fr = 'la République de Kiribati',
  list_name_ru = 'Кирибати',
  full_name_ru = 'Республика Кирибати',
  pan_european = false
WHERE
  country_iso = 'KIR';

UPDATE
  country
SET
  list_name_en = 'Kuwait',
  full_name_en = 'the State of Kuwait',
  list_name_es = 'Kuwait',
  full_name_es = 'el Estado de Kuwait',
  list_name_fr = 'Koweït',
  full_name_fr = 'l''État du Koweït',
  list_name_ru = 'Кувейт',
  full_name_ru = 'Государство Кувейт',
  pan_european = false
WHERE
  country_iso = 'KWT';

UPDATE
  country
SET
  list_name_en = 'Kyrgyzstan',
  full_name_en = 'the Kyrgyz Republic',
  list_name_es = 'Kirguistán',
  full_name_es = 'la República Kirguisa',
  list_name_fr = 'Kirghizistan',
  full_name_fr = 'la République kirghize',
  list_name_ru = 'Кыргызстан',
  full_name_ru = 'Кыргызская Республика',
  pan_european = false
WHERE
  country_iso = 'KGZ';

UPDATE
  country
SET
  list_name_en = 'Lao People''s Democratic Republic',
  full_name_en = 'the Lao People''s Democratic Republic',
  list_name_es = 'República Democrática Popular Lao',
  full_name_es = 'la República Democrática Popular Lao',
  list_name_fr = 'République démocratique populaire lao',
  full_name_fr = 'la République démocratique populaire lao',
  list_name_ru = 'Лаосская Народно-Демократическая Республика',
  full_name_ru = 'Лаосская Народно-Демократическая Республика',
  pan_european = false
WHERE
  country_iso = 'LAO';

UPDATE
  country
SET
  list_name_en = 'Latvia',
  full_name_en = 'the Republic of Latvia',
  list_name_es = 'Letonia',
  full_name_es = 'la República de Letonia',
  list_name_fr = 'Lettonie',
  full_name_fr = 'la République de Lettonie',
  list_name_ru = 'Латвия',
  full_name_ru = 'Латвийская Республика',
  pan_european = true
WHERE
  country_iso = 'LVA';

UPDATE
  country
SET
  list_name_en = 'Lebanon',
  full_name_en = 'the Lebanese Republic',
  list_name_es = 'Líbano',
  full_name_es = 'la República libanesa',
  list_name_fr = 'Liban',
  full_name_fr = 'la République libanaise',
  list_name_ru = 'Ливан',
  full_name_ru = 'Ливанская Республика',
  pan_european = false
WHERE
  country_iso = 'LBN';

UPDATE
  country
SET
  list_name_en = 'Lesotho',
  full_name_en = 'the Kingdom of Lesotho',
  list_name_es = 'Lesotho',
  full_name_es = 'el Reino de Lesotho',
  list_name_fr = 'Lesotho',
  full_name_fr = 'le Royaume du Lesotho',
  list_name_ru = 'Лесото',
  full_name_ru = 'Королевство Лесото',
  pan_european = false
WHERE
  country_iso = 'LSO';

UPDATE
  country
SET
  list_name_en = 'Liberia',
  full_name_en = 'the Republic of Liberia',
  list_name_es = 'Liberia',
  full_name_es = 'la República de Liberia',
  list_name_fr = 'Libéria',
  full_name_fr = 'la République du Libéria',
  list_name_ru = 'Либерия',
  full_name_ru = 'Республика Либерия',
  pan_european = false
WHERE
  country_iso = 'LBR';

UPDATE
  country
SET
  list_name_en = 'Libya',
  full_name_en = 'State of Libya',
  list_name_es = 'Libia',
  full_name_es = 'Estado de Libia',
  list_name_fr = 'Libye',
  full_name_fr = 'l''État de Libye',
  list_name_ru = 'Ливия',
  full_name_ru = 'Государство Ливия ',
  pan_european = false
WHERE
  country_iso = 'LBY';

UPDATE
  country
SET
  list_name_en = 'Liechtenstein',
  full_name_en = 'the Principality of Liechtenstein',
  list_name_es = 'Liechtenstein',
  full_name_es = 'el Principado de Liechtenstein',
  list_name_fr = 'Liechtenstein',
  full_name_fr = 'la Principauté du Liechtenstein',
  list_name_ru = 'Лихтенштейн',
  full_name_ru = 'Княжество Лихтенштейн',
  pan_european = true
WHERE
  country_iso = 'LIE';

UPDATE
  country
SET
  list_name_en = 'Lithuania',
  full_name_en = 'the Republic of Lithuania',
  list_name_es = 'Lituania',
  full_name_es = 'la República de Lituania',
  list_name_fr = 'Lituanie',
  full_name_fr = 'la République de Lituanie',
  list_name_ru = 'Литва',
  full_name_ru = 'Литовская Республика',
  pan_european = true
WHERE
  country_iso = 'LTU';

UPDATE
  country
SET
  list_name_en = 'Luxembourg',
  full_name_en = 'the Grand Duchy of Luxembourg',
  list_name_es = 'Luxemburgo',
  full_name_es = 'el Gran Ducado de Luxemburgo',
  list_name_fr = 'Luxembourg',
  full_name_fr = 'le Grand-Duché de Luxembourg',
  list_name_ru = 'Люксембург',
  full_name_ru = 'Великое Герцогство Люксембург',
  pan_european = true
WHERE
  country_iso = 'LUX';

UPDATE
  country
SET
  list_name_en = 'Madagascar',
  full_name_en = 'the Republic of Madagascar',
  list_name_es = 'Madagascar',
  full_name_es = 'la República de Madagascar',
  list_name_fr = 'Madagascar',
  full_name_fr = 'la République de Madagascar',
  list_name_ru = 'Мадагаскар',
  full_name_ru = 'Республика Мадагаскар',
  pan_european = false
WHERE
  country_iso = 'MDG';

UPDATE
  country
SET
  list_name_en = 'Malawi',
  full_name_en = 'the Republic of Malawi',
  list_name_es = 'Malawi',
  full_name_es = 'la República de Malawi',
  list_name_fr = 'Malawi',
  full_name_fr = 'la République du Malawi',
  list_name_ru = 'Малави',
  full_name_ru = 'Республика Малави',
  pan_european = false
WHERE
  country_iso = 'MWI';

UPDATE
  country
SET
  list_name_en = 'Malaysia',
  full_name_en = 'Malaysia',
  list_name_es = 'Malasia',
  full_name_es = 'Malasia',
  list_name_fr = 'Malaisie',
  full_name_fr = 'la Malaisie',
  list_name_ru = 'Малайзия',
  full_name_ru = 'Малайзия',
  pan_european = false
WHERE
  country_iso = 'MYS';

UPDATE
  country
SET
  list_name_en = 'Maldives',
  full_name_en = 'the Republic of Maldives',
  list_name_es = 'Maldivas',
  full_name_es = 'la República de Maldivas',
  list_name_fr = 'Maldives',
  full_name_fr = 'la République des Maldives',
  list_name_ru = 'Мальдивы',
  full_name_ru = 'Мальдивская Республика',
  pan_european = false
WHERE
  country_iso = 'MDV';

UPDATE
  country
SET
  list_name_en = 'Mali',
  full_name_en = 'the Republic of Mali',
  list_name_es = 'Malí',
  full_name_es = 'la República de Malí',
  list_name_fr = 'Mali',
  full_name_fr = 'la République du Mali',
  list_name_ru = 'Мали',
  full_name_ru = 'Республика Мали',
  pan_european = false
WHERE
  country_iso = 'MLI';

UPDATE
  country
SET
  list_name_en = 'Malta',
  full_name_en = 'the Republic of Malta',
  list_name_es = 'Malta',
  full_name_es = 'la República de Malta',
  list_name_fr = 'Malte',
  full_name_fr = 'la République de Malte',
  list_name_ru = 'Мальта',
  full_name_ru = 'Республика Мальта',
  pan_european = true
WHERE
  country_iso = 'MLT';

UPDATE
  country
SET
  list_name_en = 'Marshall Islands',
  full_name_en = 'the Republic of the Marshall Islands',
  list_name_es = 'Islas Marshall',
  full_name_es = 'la República de las Islas Marshall',
  list_name_fr = 'Îles Marshall',
  full_name_fr = 'la République des Îles Marshall',
  list_name_ru = 'Маршалловы Острова',
  full_name_ru = 'Республика Маршалловы Острова',
  pan_european = false
WHERE
  country_iso = 'MHL';

UPDATE
  country
SET
  list_name_en = 'Martinique',
  full_name_en = 'Martinique',
  list_name_es = 'Martinica',
  full_name_es = 'Martinica',
  list_name_fr = 'Martinique',
  full_name_fr = 'la Martinique',
  list_name_ru = 'Мартиника',
  full_name_ru = 'Мартиника',
  pan_european = false
WHERE
  country_iso = 'MTQ';

UPDATE
  country
SET
  list_name_en = 'Mauritania',
  full_name_en = 'the Islamic Republic of Mauritania',
  list_name_es = 'Mauritania',
  full_name_es = 'la República Islámica de Mauritania',
  list_name_fr = 'Mauritanie',
  full_name_fr = 'la République islamique de Mauritanie',
  list_name_ru = 'Мавритания',
  full_name_ru = 'Исламская Республика Мавритания',
  pan_european = false
WHERE
  country_iso = 'MRT';

UPDATE
  country
SET
  list_name_en = 'Mauritius',
  full_name_en = 'the Republic of Mauritius',
  list_name_es = 'Mauricio',
  full_name_es = 'la República de Mauricio',
  list_name_fr = 'Maurice',
  full_name_fr = 'la République de Maurice',
  list_name_ru = 'Маврикий',
  full_name_ru = 'Республика Маврикий',
  pan_european = false
WHERE
  country_iso = 'MUS';

UPDATE
  country
SET
  list_name_en = 'Mayotte',
  full_name_en = 'Mayotte',
  list_name_es = 'Mayotte',
  full_name_es = 'Mayotte',
  list_name_fr = 'Mayotte',
  full_name_fr = 'Mayotte',
  list_name_ru = 'Майотта',
  full_name_ru = 'Майотта',
  pan_european = false
WHERE
  country_iso = 'MYT';

UPDATE
  country
SET
  list_name_en = 'Mexico',
  full_name_en = 'the United Mexican States',
  list_name_es = 'México',
  full_name_es = 'los Estados Unidos Mexicanos',
  list_name_fr = 'Mexique',
  full_name_fr = 'les États-Unis du Mexique',
  list_name_ru = 'Мексика',
  full_name_ru = 'Мексиканские Соединенные Штаты',
  pan_european = false
WHERE
  country_iso = 'MEX';

UPDATE
  country
SET
  list_name_en = 'Micronesia (Federated States of)',
  full_name_en = 'the Federated States of Micronesia',
  list_name_es = 'Micronesia (Estados Federados de)',
  full_name_es = 'los Estados Federados de Micronesia',
  list_name_fr = 'Micronésie (États fédérés de)',
  full_name_fr = 'les États fédérés de Micronésie',
  list_name_ru = 'Микронезия (Федеративные Штаты)',
  full_name_ru = 'Федеративные Штаты Микронезии',
  pan_european = false
WHERE
  country_iso = 'FSM';

UPDATE
  country
SET
  list_name_en = 'Monaco',
  full_name_en = 'the Principality of Monaco',
  list_name_es = 'Mónaco',
  full_name_es = 'el Principado de Mónaco',
  list_name_fr = 'Monaco',
  full_name_fr = 'la Principauté de Monaco',
  list_name_ru = 'Монако',
  full_name_ru = 'Княжество Монако',
  pan_european = true
WHERE
  country_iso = 'MCO';

UPDATE
  country
SET
  list_name_en = 'Mongolia',
  full_name_en = 'Mongolia',
  list_name_es = 'Mongolia',
  full_name_es = 'Mongolia',
  list_name_fr = 'Mongolie',
  full_name_fr = 'la Mongolie',
  list_name_ru = 'Монголия',
  full_name_ru = 'Монголия',
  pan_european = false
WHERE
  country_iso = 'MNG';

UPDATE
  country
SET
  list_name_en = 'Montenegro',
  full_name_en = 'Montenegro',
  list_name_es = 'Montenegro',
  full_name_es = 'Montenegro',
  list_name_fr = 'Monténégro',
  full_name_fr = 'le Monténégro',
  list_name_ru = 'Черногория',
  full_name_ru = 'Черногория',
  pan_european = true
WHERE
  country_iso = 'MNE';

UPDATE
  country
SET
  list_name_en = 'Montserrat',
  full_name_en = 'Montserrat',
  list_name_es = 'Montserrat',
  full_name_es = 'Montserrat',
  list_name_fr = 'Montserrat',
  full_name_fr = 'Montserrat',
  list_name_ru = 'Монтсеррат',
  full_name_ru = 'Монтсеррат',
  pan_european = false
WHERE
  country_iso = 'MSR';

UPDATE
  country
SET
  list_name_en = 'Morocco',
  full_name_en = 'the Kingdom of Morocco',
  list_name_es = 'Marruecos',
  full_name_es = 'el Reino de Marruecos',
  list_name_fr = 'Maroc',
  full_name_fr = 'le Royaume du Maroc',
  list_name_ru = 'Марокко',
  full_name_ru = 'Королевство Марокко',
  pan_european = false
WHERE
  country_iso = 'MAR';

UPDATE
  country
SET
  list_name_en = 'Mozambique',
  full_name_en = 'the Republic of Mozambique',
  list_name_es = 'Mozambique',
  full_name_es = 'la República de Mozambique',
  list_name_fr = 'Mozambique',
  full_name_fr = 'la République du Mozambique',
  list_name_ru = 'Мозамбик',
  full_name_ru = 'Республика Мозамбик',
  pan_european = false
WHERE
  country_iso = 'MOZ';

UPDATE
  country
SET
  list_name_en = 'Myanmar',
  full_name_en = 'the Republic of the Union of Myanmar',
  list_name_es = 'Myanmar',
  full_name_es = 'la República de la Unión de Myanmar',
  list_name_fr = 'Myanmar',
  full_name_fr = 'République de l''Union du Myanmar',
  list_name_ru = 'Мьянма',
  full_name_ru = 'Республика Союз Мьянма',
  pan_european = false
WHERE
  country_iso = 'MMR';

UPDATE
  country
SET
  list_name_en = 'Namibia',
  full_name_en = 'the Republic of Namibia',
  list_name_es = 'Namibia',
  full_name_es = 'la República de Namibia',
  list_name_fr = 'Namibie',
  full_name_fr = 'la République de Namibie',
  list_name_ru = 'Намибия',
  full_name_ru = 'Республика Намибия',
  pan_european = false
WHERE
  country_iso = 'NAM';

UPDATE
  country
SET
  list_name_en = 'Nauru',
  full_name_en = 'the Republic of Nauru',
  list_name_es = 'Nauru',
  full_name_es = 'la República de Nauru',
  list_name_fr = 'Nauru',
  full_name_fr = 'la République de Nauru',
  list_name_ru = 'Науру',
  full_name_ru = 'Республика Науру',
  pan_european = false
WHERE
  country_iso = 'NRU';

UPDATE
  country
SET
  list_name_en = 'Nepal',
  full_name_en = 'the Federal Democratic Republic of Nepal',
  list_name_es = 'Nepal',
  full_name_es = 'la República Democrática Federal de Nepal',
  list_name_fr = 'Népal',
  full_name_fr = 'la République fédérale démocratique du Nepal',
  list_name_ru = 'Непал',
  full_name_ru = 'Федеративная Демократическая Республика Непал',
  pan_european = false
WHERE
  country_iso = 'NPL';

UPDATE
  country
SET
  list_name_en = 'Netherlands',
  full_name_en = 'the Kingdom of the Netherlands',
  list_name_es = 'Países Bajos',
  full_name_es = 'el Reino de los Países Bajos',
  list_name_fr = 'Pays-Bas',
  full_name_fr = 'le Royaume des Pays-Bas',
  list_name_ru = 'Нидерланды',
  full_name_ru = 'Королевство Нидерландов',
  pan_european = true
WHERE
  country_iso = 'NLD';

UPDATE
  country
SET
  list_name_en = 'New Caledonia',
  full_name_en = 'New Caledonia',
  list_name_es = 'Nueva Caledonia',
  full_name_es = 'Nueva Caledonia',
  list_name_fr = 'Nouvelle-Calédonie',
  full_name_fr = 'la Nouvelle-Calédonie',
  list_name_ru = 'Новая Каледония',
  full_name_ru = 'Новая Каледония',
  pan_european = false
WHERE
  country_iso = 'NCL';

UPDATE
  country
SET
  list_name_en = 'New Zealand',
  full_name_en = 'New Zealand',
  list_name_es = 'Nueva Zelandia',
  full_name_es = 'Nueva Zelandia',
  list_name_fr = 'Nouvelle-Zélande',
  full_name_fr = 'la Nouvelle-Zélande',
  list_name_ru = 'Новая Зеландия',
  full_name_ru = 'Новая Зеландия',
  pan_european = false
WHERE
  country_iso = 'NZL';

UPDATE
  country
SET
  list_name_en = 'Nicaragua',
  full_name_en = 'the Republic of Nicaragua',
  list_name_es = 'Nicaragua',
  full_name_es = 'la República de Nicaragua',
  list_name_fr = 'Nicaragua',
  full_name_fr = 'la République du Nicaragua',
  list_name_ru = 'Никарагуа',
  full_name_ru = 'Республика Никарагуа',
  pan_european = false
WHERE
  country_iso = 'NIC';

UPDATE
  country
SET
  list_name_en = 'Niger',
  full_name_en = 'the Republic of the Niger',
  list_name_es = 'Níger',
  full_name_es = 'la República del Níger',
  list_name_fr = 'Niger',
  full_name_fr = 'la République du Niger',
  list_name_ru = 'Нигер',
  full_name_ru = 'Республика Нигер',
  pan_european = false
WHERE
  country_iso = 'NER';

UPDATE
  country
SET
  list_name_en = 'Nigeria',
  full_name_en = 'the Federal Republic of Nigeria',
  list_name_es = 'Nigeria',
  full_name_es = 'la República Federal de Nigeria',
  list_name_fr = 'Nigéria',
  full_name_fr = 'la République fédérale du Nigéria',
  list_name_ru = 'Нигерия',
  full_name_ru = 'Федеративная Республика Нигерия',
  pan_european = false
WHERE
  country_iso = 'NGA';

UPDATE
  country
SET
  list_name_en = 'Niue',
  full_name_en = 'Niue',
  list_name_es = 'Niue',
  full_name_es = 'Niue',
  list_name_fr = 'Nioué',
  full_name_fr = 'Nioué',
  list_name_ru = 'Ниуэ',
  full_name_ru = 'Ниуэ',
  pan_european = false
WHERE
  country_iso = 'NIU';

UPDATE
  country
SET
  list_name_en = 'Norfolk Island',
  full_name_en = 'Territory of Norfolk Island',
  list_name_es = 'Isla Norfolk',
  full_name_es = 'Isla Norfolk',
  list_name_fr = 'Île Norfolk',
  full_name_fr = 'Île Norfolk',
  list_name_ru = 'остров Норфолк',
  full_name_ru = 'остров Норфолк',
  pan_european = false
WHERE
  country_iso = 'NFK';

UPDATE
  country
SET
  list_name_en = 'Northern Mariana Islands',
  full_name_en = 'The Commonwealth of the Northern Mariana Islands',
  list_name_es = 'Islas Marianas septentrionales',
  full_name_es = 'Islas Marianas septentrionales',
  list_name_fr = 'Îles Mariannes du Nord',
  full_name_fr = 'Commonwealth des Mariannes du Nord',
  list_name_ru = 'Северные Марианские острова',
  full_name_ru = 'Содружество Северных Марианских островов',
  pan_european = false
WHERE
  country_iso = 'MNP';

UPDATE
  country
SET
  list_name_en = 'Norway',
  full_name_en = 'the Kingdom of Norway',
  list_name_es = 'Noruega',
  full_name_es = 'el Reino de Noruega',
  list_name_fr = 'Norvège',
  full_name_fr = 'le Royaume de Norvège',
  list_name_ru = 'Норвегия',
  full_name_ru = 'Королевство Норвегия',
  pan_european = true
WHERE
  country_iso = 'NOR';

UPDATE
  country
SET
  list_name_en = 'Palestine',
  full_name_en = 'Palestine',
  list_name_es = 'Territorio Palestino Ocupado',
  full_name_es = 'territorio palestino ocupado',
  list_name_fr = 'Territoire palestinien occupé',
  full_name_fr = 'Territoire palestinien occupé',
  list_name_ru = 'Палестина',
  full_name_ru = 'Палестина',
  pan_european = false
WHERE
  country_iso = 'PSE';

UPDATE
  country
SET
  list_name_en = 'Oman',
  full_name_en = 'the Sultanate of Oman',
  list_name_es = 'Omán',
  full_name_es = 'la Sultanía de Omán',
  list_name_fr = 'Oman',
  full_name_fr = 'le Sultanat d''Oman',
  list_name_ru = 'Оман',
  full_name_ru = 'Султанат Оман',
  pan_european = false
WHERE
  country_iso = 'OMN';

UPDATE
  country
SET
  list_name_en = 'Pakistan',
  full_name_en = 'the Islamic Republic of Pakistan',
  list_name_es = 'Pakistán',
  full_name_es = 'la República Islámica del Pakistán',
  list_name_fr = 'Pakistan',
  full_name_fr = 'la République islamique du Pakistan',
  list_name_ru = 'Пакистан',
  full_name_ru = 'Исламская Республика Пакистан',
  pan_european = false
WHERE
  country_iso = 'PAK';

UPDATE
  country
SET
  list_name_en = 'Palau',
  full_name_en = 'the Republic of Palau',
  list_name_es = 'Palau',
  full_name_es = 'la República de Palau',
  list_name_fr = 'Palaos',
  full_name_fr = 'la République des Palaos',
  list_name_ru = 'Палау',
  full_name_ru = 'Республика Палау',
  pan_european = false
WHERE
  country_iso = 'PLW';

UPDATE
  country
SET
  list_name_en = 'Panama',
  full_name_en = 'the Republic of Panama',
  list_name_es = 'Panamá',
  full_name_es = 'la República de Panamá',
  list_name_fr = 'Panama',
  full_name_fr = 'la République du Panama',
  list_name_ru = 'Панама',
  full_name_ru = 'Республика Панама',
  pan_european = false
WHERE
  country_iso = 'PAN';

UPDATE
  country
SET
  list_name_en = 'Papua New Guinea',
  full_name_en = 'Independent State of Papua New Guinea',
  list_name_es = 'Papua Nueva Guinea',
  full_name_es = 'Estado Independiente de Papua Nueva Guinea',
  list_name_fr = 'Papouasie-Nouvelle-Guinée',
  full_name_fr = 'État indépendant de Papouasie-Nouvelle-Guinée',
  list_name_ru = 'Папуа-Новая Гвинея',
  full_name_ru = 'Независимое государство Папуа-Новая Гвинея',
  pan_european = false
WHERE
  country_iso = 'PNG';

UPDATE
  country
SET
  list_name_en = 'Paraguay',
  full_name_en = 'the Republic of Paraguay',
  list_name_es = 'Paraguay',
  full_name_es = 'la República del Paraguay',
  list_name_fr = 'Paraguay',
  full_name_fr = 'la République du Paraguay',
  list_name_ru = 'Парагвай',
  full_name_ru = 'Республика Парагвай',
  pan_european = false
WHERE
  country_iso = 'PRY';

UPDATE
  country
SET
  list_name_en = 'Peru',
  full_name_en = 'the Republic of Peru',
  list_name_es = 'Perú',
  full_name_es = 'la República del Perú',
  list_name_fr = 'Pérou',
  full_name_fr = 'la République du Pérou',
  list_name_ru = 'Перу',
  full_name_ru = 'Республика Перу',
  pan_european = false
WHERE
  country_iso = 'PER';

UPDATE
  country
SET
  list_name_en = 'Philippines',
  full_name_en = 'the Republic of the Philippines',
  list_name_es = 'Filipinas',
  full_name_es = 'la República de Filipinas',
  list_name_fr = 'Philippines',
  full_name_fr = 'la République des Philippines',
  list_name_ru = 'Филиппины',
  full_name_ru = 'Республика Филиппины',
  pan_european = false
WHERE
  country_iso = 'PHL';

UPDATE
  country
SET
  list_name_en = 'Pitcairn Islands',
  full_name_en = 'Pitcairn Islands',
  list_name_es = 'Islas Pitcairn',
  full_name_es = 'Islas Pitcairn',
  list_name_fr = 'Îles Pitcairn',
  full_name_fr = 'Îles Pitcairn',
  list_name_ru = 'Питкэрн',
  full_name_ru = 'Питкэрн',
  pan_european = false
WHERE
  country_iso = 'PCN';

UPDATE
  country
SET
  list_name_en = 'Poland',
  full_name_en = 'the Republic of Poland',
  list_name_es = 'Polonia',
  full_name_es = 'la República de Polonia',
  list_name_fr = 'Pologne',
  full_name_fr = 'la République de Pologne',
  list_name_ru = 'Польша',
  full_name_ru = 'Республика Польша',
  pan_european = true
WHERE
  country_iso = 'POL';

UPDATE
  country
SET
  list_name_en = 'Portugal',
  full_name_en = 'the Portuguese Republic',
  list_name_es = 'Portugal',
  full_name_es = 'la República Portuguesa',
  list_name_fr = 'Portugal',
  full_name_fr = 'la République portugaise',
  list_name_ru = 'Португалия',
  full_name_ru = 'Португальская Республика',
  pan_european = true
WHERE
  country_iso = 'PRT';

UPDATE
  country
SET
  list_name_en = 'Puerto Rico',
  full_name_en = 'the Commonwealth of Puerto Rico',
  list_name_es = 'Puerto Rico',
  full_name_es = 'el Estado Libre Asociado de Puerto Rico',
  list_name_fr = 'Porto Rico',
  full_name_fr = 'l''État libre associé de Porto Rico',
  list_name_ru = 'Пуэрто-Рико',
  full_name_ru = 'Содружество Пуэрто-Рико',
  pan_european = false
WHERE
  country_iso = 'PRI';

UPDATE
  country
SET
  list_name_en = 'Qatar',
  full_name_en = 'the State of Qatar',
  list_name_es = 'Qatar',
  full_name_es = 'el Estado de Qatar',
  list_name_fr = 'Qatar',
  full_name_fr = 'l''État du Qatar',
  list_name_ru = 'Катар',
  full_name_ru = 'Государство Катар',
  pan_european = false
WHERE
  country_iso = 'QAT';

UPDATE
  country
SET
  list_name_en = 'Republic of Korea',
  full_name_en = 'the Republic of Korea',
  list_name_es = 'República de Corea',
  full_name_es = 'la República de Corea',
  list_name_fr = 'République de Corée',
  full_name_fr = 'la République de Corée',
  list_name_ru = 'Республика Корея',
  full_name_ru = 'Республика Корея',
  pan_european = false
WHERE
  country_iso = 'KOR';

UPDATE
  country
SET
  list_name_en = 'Republic of Moldova',
  full_name_en = 'the Republic of Moldova',
  list_name_es = 'República de Moldova',
  full_name_es = 'la República de Moldova',
  list_name_fr = 'République de Moldova',
  full_name_fr = 'la République de Moldova',
  list_name_ru = 'Республика Молдова',
  full_name_ru = 'Республика Молдова',
  pan_european = true
WHERE
  country_iso = 'MDA';

UPDATE
  country
SET
  list_name_en = 'Réunion',
  full_name_en = 'Réunion',
  list_name_es = 'Reunión',
  full_name_es = 'Reunión',
  list_name_fr = 'Réunion',
  full_name_fr = 'la Réunion',
  list_name_ru = 'Реюньон',
  full_name_ru = 'Реюньон',
  pan_european = false
WHERE
  country_iso = 'REU';

UPDATE
  country
SET
  list_name_en = 'Romania',
  full_name_en = 'Romania',
  list_name_es = 'Rumania',
  full_name_es = 'Rumania',
  list_name_fr = 'Roumanie',
  full_name_fr = 'la Roumanie',
  list_name_ru = 'Румыния',
  full_name_ru = 'Румыния',
  pan_european = true
WHERE
  country_iso = 'ROU';

UPDATE
  country
SET
  list_name_en = 'Russian Federation',
  full_name_en = 'the Russian Federation',
  list_name_es = 'Federación de Rusia',
  full_name_es = 'la Federación de Rusia',
  list_name_fr = 'Fédération de Russie',
  full_name_fr = 'la Fédération de Russie',
  list_name_ru = 'Российская Федерация',
  full_name_ru = 'Российская Федерация',
  pan_european = true
WHERE
  country_iso = 'RUS';

UPDATE
  country
SET
  list_name_en = 'Rwanda',
  full_name_en = 'the Republic of Rwanda',
  list_name_es = 'Rwanda',
  full_name_es = 'la República de Rwanda',
  list_name_fr = 'Rwanda',
  full_name_fr = 'la République du Rwanda',
  list_name_ru = 'Руанда',
  full_name_ru = 'Республика Руанда',
  pan_european = false
WHERE
  country_iso = 'RWA';

UPDATE
  country
SET
  list_name_en = 'Saint Barthélemy',
  full_name_en = 'Saint Barthélemy',
  list_name_es = 'San Bartolomé',
  full_name_es = 'San Bartolomé',
  list_name_fr = 'Saint-Barthélemy',
  full_name_fr = 'Saint-Barthélemy',
  list_name_ru = 'Сен-Бартельми',
  full_name_ru = 'Сен-Бартельми',
  pan_european = false
WHERE
  country_iso = 'BLM';

UPDATE
  country
SET
  list_name_en = 'Saint Helena, Ascension and Tristan da Cunha',
  full_name_en = 'Saint Helena, Ascension and Tristan da Cunha',
  list_name_es = 'Santa Elena, Ascensión y Tristán de Acuña',
  full_name_es = 'Santa Elena, Ascensión y Tristán de Acuña',
  list_name_fr = 'Sainte-Hélène, Ascension et Tristan da Cunha',
  full_name_fr = 'Sainte-Hélène, Ascension et Tristan da Cunha',
  list_name_ru = 'острова Святой Елены, Вознесения и Тристан-да-Кунья',
  full_name_ru = 'острова Святой Елены, Вознесения и Тристан-да-Кунья',
  pan_european = false
WHERE
  country_iso = 'SHN';

UPDATE
  country
SET
  list_name_en = 'Saint Kitts and Nevis',
  full_name_en = 'Saint Kitts and Nevis',
  list_name_es = 'Saint Kitts y Nevis',
  full_name_es = 'Saint Kitts y Nevis',
  list_name_fr = 'Saint-Kitts-et-Nevis',
  full_name_fr = 'Saint-Kitts-et-Nevis',
  list_name_ru = 'Сент-Китс и Невис',
  full_name_ru = 'Сент-Китс и Невис',
  pan_european = false
WHERE
  country_iso = 'KNA';

UPDATE
  country
SET
  list_name_en = 'Saint Lucia',
  full_name_en = 'Saint Lucia',
  list_name_es = 'Santa Lucía',
  full_name_es = 'Santa Lucía',
  list_name_fr = 'Sainte-Lucie',
  full_name_fr = 'Sainte-Lucie',
  list_name_ru = 'Сент-Люсия',
  full_name_ru = 'Сент-Люсия',
  pan_european = false
WHERE
  country_iso = 'LCA';

UPDATE
  country
SET
  list_name_en = 'Saint-Martin (French Part)',
  full_name_en = 'Saint-Martin (French Part)',
  list_name_es = 'Saint-Martin (parte francesa)',
  full_name_es = 'Saint-Martin (parte francesa)',
  list_name_fr = 'Saint-Martin (partie française)',
  full_name_fr = 'Saint-Martin (partie française)',
  list_name_ru = 'Сен-Мартен (французская часть)',
  full_name_ru = 'Сен-Мартен (французская часть)',
  pan_european = false
WHERE
  country_iso = 'MAF';

UPDATE
  country
SET
  list_name_en = 'Saint Pierre and Miquelon',
  full_name_en = 'Saint Pierre and Miquelon',
  list_name_es = 'Saint-Pierre y Miquelon',
  full_name_es = 'Saint-Pierre y Miquelon',
  list_name_fr = 'Saint-Pierre-et-Miquelon',
  full_name_fr = 'Saint-Pierre-et-Miquelon',
  list_name_ru = 'Сен-Пьер и Микелон',
  full_name_ru = 'Сен-Пьер и Микелон',
  pan_european = false
WHERE
  country_iso = 'SPM';

UPDATE
  country
SET
  list_name_en = 'Saint Vincent and the Grenadines',
  full_name_en = 'Saint Vincent and the Grenadines',
  list_name_es = 'San Vicente y las Granadinas',
  full_name_es = 'San Vicente y las Granadinas',
  list_name_fr = 'Saint-Vincent-et-les Grenadines',
  full_name_fr = 'Saint-Vincent-et-les Grenadines',
  list_name_ru = 'Сент-Винсент и Гренадины',
  full_name_ru = 'Сент-Винсент и Гренадины',
  pan_european = false
WHERE
  country_iso = 'VCT';

UPDATE
  country
SET
  list_name_en = 'Samoa',
  full_name_en = 'the Independent State of Samoa',
  list_name_es = 'Samoa',
  full_name_es = 'el Estado Independiente de Samoa',
  list_name_fr = 'Samoa',
  full_name_fr = 'l''État indépendant du Samoa',
  list_name_ru = 'Самоа',
  full_name_ru = 'Независимое Государство Самоа',
  pan_european = false
WHERE
  country_iso = 'WSM';

UPDATE
  country
SET
  list_name_en = 'San Marino',
  full_name_en = 'the Republic of San Marino',
  list_name_es = 'San Marino',
  full_name_es = 'la República de San Marino',
  list_name_fr = 'Saint-Marin',
  full_name_fr = 'la République de Saint-Marin',
  list_name_ru = 'Сан-Марино',
  full_name_ru = 'Республика Сан-Марино',
  pan_european = false
WHERE
  country_iso = 'SMR';

UPDATE
  country
SET
  list_name_en = 'Sao Tome and Principe',
  full_name_en = 'the Democratic Republic of Sao Tome and Principe',
  list_name_es = 'Santo Tomé y Príncipe',
  full_name_es = 'la República Democrática de Santo Tomé y Príncipe',
  list_name_fr = 'Sao Tomé-et-Principe',
  full_name_fr = 'la République démocratique de Sao Tomé-et-Principe',
  list_name_ru = 'Сан-Томе и Принсипи',
  full_name_ru = 'Демократическая Республика Сан-Томе и Принсипи',
  pan_european = false
WHERE
  country_iso = 'STP';

UPDATE
  country
SET
  list_name_en = 'Saudi Arabia',
  full_name_en = 'the Kingdom of Saudi Arabia',
  list_name_es = 'Arabia Saudita',
  full_name_es = 'el Reino de la Arabia Saudita',
  list_name_fr = 'Arabie saoudite',
  full_name_fr = 'le Royaume d''Arabie saoudite',
  list_name_ru = 'Саудовская Аравия',
  full_name_ru = 'Королевство Саудовская Аравия',
  pan_european = false
WHERE
  country_iso = 'SAU';

UPDATE
  country
SET
  list_name_en = 'Senegal',
  full_name_en = 'the Republic of Senegal',
  list_name_es = 'Senegal',
  full_name_es = 'la República del Senegal',
  list_name_fr = 'Sénégal',
  full_name_fr = 'la République du Sénégal',
  list_name_ru = 'Сенегал',
  full_name_ru = 'Республика Сенегал',
  pan_european = false
WHERE
  country_iso = 'SEN';

UPDATE
  country
SET
  list_name_en = 'Serbia',
  full_name_en = 'the Republic of Serbia',
  list_name_es = 'Serbia',
  full_name_es = 'la República de Serbia',
  list_name_fr = 'Serbie',
  full_name_fr = 'la République de Serbie',
  list_name_ru = 'Сербия',
  full_name_ru = 'Республика Сербия',
  pan_european = true
WHERE
  country_iso = 'SRB';

UPDATE
  country
SET
  list_name_en = 'Seychelles',
  full_name_en = 'the Republic of Seychelles',
  list_name_es = 'Seychelles',
  full_name_es = 'la República de Seychelles',
  list_name_fr = 'Seychelles',
  full_name_fr = 'la République des Seychelles',
  list_name_ru = 'Сейшельские Острова',
  full_name_ru = 'Республика Сейшельские Острова',
  pan_european = false
WHERE
  country_iso = 'SYC';

UPDATE
  country
SET
  list_name_en = 'Sierra Leone',
  full_name_en = 'the Republic of Sierra Leone',
  list_name_es = 'Sierra Leona',
  full_name_es = 'la República de Sierra Leona',
  list_name_fr = 'Sierra Leone',
  full_name_fr = 'la République de Sierra Leone',
  list_name_ru = 'Сьерра-Леоне',
  full_name_ru = 'Республика Сьерра-Леоне',
  pan_european = false
WHERE
  country_iso = 'SLE';

UPDATE
  country
SET
  list_name_en = 'Singapore',
  full_name_en = 'the Republic of Singapore',
  list_name_es = 'Singapur',
  full_name_es = 'la República de Singapur',
  list_name_fr = 'Singapour',
  full_name_fr = 'la République de Singapour',
  list_name_ru = 'Сингапур',
  full_name_ru = 'Республика Сингапур',
  pan_european = false
WHERE
  country_iso = 'SGP';

UPDATE
  country
SET
  list_name_en = 'Slovakia',
  full_name_en = 'the Slovak Republic',
  list_name_es = 'Eslovaquia',
  full_name_es = 'la República Eslovaca',
  list_name_fr = 'Slovaquie',
  full_name_fr = 'la République slovaque',
  list_name_ru = 'Словакия',
  full_name_ru = 'Словацкая Республика',
  pan_european = true
WHERE
  country_iso = 'SVK';

UPDATE
  country
SET
  list_name_en = 'Slovenia',
  full_name_en = 'the Republic of Slovenia',
  list_name_es = 'Eslovenia',
  full_name_es = 'la República de Eslovenia',
  list_name_fr = 'Slovénie',
  full_name_fr = 'la République de Slovénie',
  list_name_ru = 'Словения',
  full_name_ru = 'Республика Словения',
  pan_european = true
WHERE
  country_iso = 'SVN';

UPDATE
  country
SET
  list_name_en = 'Solomon Islands',
  full_name_en = 'Solomon Islands',
  list_name_es = 'Islas Salomón',
  full_name_es = 'las Islas Salomón',
  list_name_fr = 'Îles Salomon',
  full_name_fr = 'les Îles Salomon',
  list_name_ru = 'Соломоновы Острова',
  full_name_ru = 'Соломоновы Острова',
  pan_european = false
WHERE
  country_iso = 'SLB';

UPDATE
  country
SET
  list_name_en = 'Somalia',
  full_name_en = 'the Federal Republic of Somalia',
  list_name_es = 'Somalia',
  full_name_es = 'la República Federal de Somalia',
  list_name_fr = 'Somalie',
  full_name_fr = 'la République fédérale de Somalie',
  list_name_ru = 'Сомали',
  full_name_ru = 'Федеративная Республика Сомали',
  pan_european = false
WHERE
  country_iso = 'SOM';

UPDATE
  country
SET
  list_name_en = 'South Africa',
  full_name_en = 'the Republic of South Africa',
  list_name_es = 'Sudáfrica',
  full_name_es = 'la República de Sudáfrica',
  list_name_fr = 'Afrique du Sud',
  full_name_fr = 'la République sud-africaine',
  list_name_ru = 'Южная Африка',
  full_name_ru = 'Южно-Африканская Республика',
  pan_european = false
WHERE
  country_iso = 'ZAF';

UPDATE
  country
SET
  list_name_en = 'South Sudan',
  full_name_en = 'the Republic of South Sudan',
  list_name_es = 'Sudán del Sur',
  full_name_es = 'la República de Sudán del Sur',
  list_name_fr = 'Soudan du Sud',
  full_name_fr = 'République du Soudan du Sud',
  list_name_ru = 'Южный Судан',
  full_name_ru = 'Республика Южный Судан',
  pan_european = false
WHERE
  country_iso = 'SSD';

UPDATE
  country
SET
  list_name_en = 'Spain',
  full_name_en = 'the Kingdom of Spain',
  list_name_es = 'España',
  full_name_es = 'el Reino de España',
  list_name_fr = 'Espagne',
  full_name_fr = 'le Royaume d''Espagne',
  list_name_ru = 'Испания',
  full_name_ru = 'Королевство Испания',
  pan_european = true
WHERE
  country_iso = 'ESP';

UPDATE
  country
SET
  list_name_en = 'Sri Lanka',
  full_name_en = 'the Democratic Socialist Republic of Sri Lanka',
  list_name_es = 'Sri Lanka',
  full_name_es = 'la República Socialista Democrática de Sri Lanka',
  list_name_fr = 'Sri Lanka',
  full_name_fr = 'la République socialiste démocratique de Sri Lanka',
  list_name_ru = 'Шри-Ланка',
  full_name_ru = 'Демократическая Социалистическая Республика Шри-Ланка',
  pan_european = false
WHERE
  country_iso = 'LKA';

UPDATE
  country
SET
  list_name_en = 'Sudan',
  full_name_en = 'the Republic of the Sudan',
  list_name_es = 'Sudán',
  full_name_es = 'la República del Sudán',
  list_name_fr = 'Soudan',
  full_name_fr = 'la République du Soudan',
  list_name_ru = 'Судан',
  full_name_ru = 'Республика Судан',
  pan_european = false
WHERE
  country_iso = 'SDN';

UPDATE
  country
SET
  list_name_en = 'Suriname',
  full_name_en = 'the Republic of Suriname',
  list_name_es = 'Suriname',
  full_name_es = 'la República de Suriname',
  list_name_fr = 'Suriname',
  full_name_fr = 'la République du Suriname',
  list_name_ru = 'Суринам',
  full_name_ru = 'Республика Суринам',
  pan_european = false
WHERE
  country_iso = 'SUR';

UPDATE
  country
SET
  list_name_en = 'Svalbard and Jan Mayen Islands',
  full_name_en = 'Svalbard and Jan Mayen Islands',
  list_name_es = 'Islas Svalbard y Jan Mayen',
  full_name_es = 'Islas Svalbard y Jan Mayen',
  list_name_fr = 'Îles Svalbard et Jan Mayen',
  full_name_fr = 'Îles Svalbard et Jan Mayen',
  list_name_ru = 'острова Свальбард и Ян-Майен',
  full_name_ru = 'острова Свальбард и Ян-Майен',
  pan_european = false
WHERE
  country_iso = 'SJM';

UPDATE
  country
SET
  list_name_en = 'Swaziland',
  full_name_en = 'the Kingdom of Swaziland',
  list_name_es = 'Swazilandia',
  full_name_es = 'el Reino de Swazilandia',
  list_name_fr = 'Swaziland',
  full_name_fr = 'le Royaume du Swaziland',
  list_name_ru = 'Свазиленд',
  full_name_ru = 'Королевство Свазиленд',
  pan_european = false
WHERE
  country_iso = 'SWZ';

UPDATE
  country
SET
  list_name_en = 'Sweden',
  full_name_en = 'the Kingdom of Sweden',
  list_name_es = 'Suecia',
  full_name_es = 'el Reino de Suecia',
  list_name_fr = 'Suède',
  full_name_fr = 'le Royaume de Suède',
  list_name_ru = 'Швеция',
  full_name_ru = 'Королевство Швеция',
  pan_european = true
WHERE
  country_iso = 'SWE';

UPDATE
  country
SET
  list_name_en = 'Switzerland',
  full_name_en = 'the Swiss Confederation',
  list_name_es = 'Suiza',
  full_name_es = 'la Confederación Suiza',
  list_name_fr = 'Suisse',
  full_name_fr = 'la Confédération suisse',
  list_name_ru = 'Швейцария',
  full_name_ru = 'Швейцарская Конфедерация',
  pan_european = true
WHERE
  country_iso = 'CHE';

UPDATE
  country
SET
  list_name_en = 'Syrian Arab Republic',
  full_name_en = 'the Syrian Arab Republic',
  list_name_es = 'República Árabe Siria',
  full_name_es = 'la República Árabe Siria',
  list_name_fr = 'République arabe syrienne',
  full_name_fr = 'la République arabe syrienne',
  list_name_ru = 'Сирийская Арабская Республика',
  full_name_ru = 'Сирийская Арабская Республика',
  pan_european = false
WHERE
  country_iso = 'SYR';

UPDATE
  country
SET
  list_name_en = 'Tajikistan',
  full_name_en = 'the Republic of Tajikistan',
  list_name_es = 'Tayikistán',
  full_name_es = 'la República de Tayikistán',
  list_name_fr = 'Tadjikistan',
  full_name_fr = 'la République du Tadjikistan',
  list_name_ru = 'Таджикистан',
  full_name_ru = 'Республика Таджикистан',
  pan_european = false
WHERE
  country_iso = 'TJK';

UPDATE
  country
SET
  list_name_en = 'Thailand',
  full_name_en = 'the Kingdom of Thailand',
  list_name_es = 'Tailandia',
  full_name_es = 'el Reino de Tailandia',
  list_name_fr = 'Thaïlande',
  full_name_fr = 'le Royaume de Thaïlande',
  list_name_ru = 'Таиланд',
  full_name_ru = 'Королевство Таиланд',
  pan_european = false
WHERE
  country_iso = 'THA';

UPDATE
  country
SET
  list_name_en = 'The former Yugoslav Republic of Macedonia',
  full_name_en = 'The former Yugoslav Republic of Macedonia',
  list_name_es = 'ex República Yugoslava de Macedonia',
  full_name_es = 'la ex República Yugoslava de Macedonia',
  list_name_fr = 'ex-République yougoslave de Macédoine',
  full_name_fr = 'l''ex-République yougoslave de Macédoine',
  list_name_ru = 'бывшая югославская Республика Македония',
  full_name_ru = 'бывшая югославская Республика Македония',
  pan_european = true
WHERE
  country_iso = 'MKD';

UPDATE
  country
SET
  list_name_en = 'Timor-Leste',
  full_name_en = 'the Democratic Republic of Timor-Leste',
  list_name_es = 'Timor-Leste',
  full_name_es = 'la República Democrática de Timor-Leste',
  list_name_fr = 'Timor-Leste',
  full_name_fr = 'la République démocratique du Timor-Leste',
  list_name_ru = 'Тимор-Лешти',
  full_name_ru = 'Демократическая Республика Тимор-Лешти',
  pan_european = false
WHERE
  country_iso = 'TLS';

UPDATE
  country
SET
  list_name_en = 'Togo',
  full_name_en = 'the Togolese Republic',
  list_name_es = 'Togo',
  full_name_es = 'la República Togolesa',
  list_name_fr = 'Togo',
  full_name_fr = 'la République togolaise',
  list_name_ru = 'Того',
  full_name_ru = 'Тоголезская Республика',
  pan_european = false
WHERE
  country_iso = 'TGO';

UPDATE
  country
SET
  list_name_en = 'Tokelau (Associate Member)',
  full_name_en = 'Tokelau',
  list_name_es = 'Tokelau (Miembro Asociado)',
  full_name_es = 'Tokelau',
  list_name_fr = 'Tokélaou (Membre associé)',
  full_name_fr = 'les Tokélaou',
  list_name_ru = 'Токелау (ассоциированный член)',
  full_name_ru = 'Токелау',
  pan_european = false
WHERE
  country_iso = 'TKL';

UPDATE
  country
SET
  list_name_en = 'Tonga',
  full_name_en = 'the Kingdom of Tonga',
  list_name_es = 'Tonga',
  full_name_es = 'el Reino de Tonga',
  list_name_fr = 'Tonga',
  full_name_fr = 'le Royaume des Tonga',
  list_name_ru = 'Тонга',
  full_name_ru = 'Королевство Тонга',
  pan_european = false
WHERE
  country_iso = 'TON';

UPDATE
  country
SET
  list_name_en = 'Trinidad and Tobago',
  full_name_en = 'the Republic of Trinidad and Tobago',
  list_name_es = 'Trinidad y Tabago',
  full_name_es = 'la República de Trinidad y Tabago',
  list_name_fr = 'Trinité-et-Tobago',
  full_name_fr = 'la République de Trinité-et-Tobago',
  list_name_ru = 'Тринидад и Тобаго',
  full_name_ru = 'Республика Тринидад и Тобаго',
  pan_european = false
WHERE
  country_iso = 'TTO';

UPDATE
  country
SET
  list_name_en = 'Tunisia',
  full_name_en = 'the Republic of Tunisia',
  list_name_es = 'Túnez',
  full_name_es = 'la República de Túnez',
  list_name_fr = 'Tunisie',
  full_name_fr = 'la République tunisienne',
  list_name_ru = 'Тунис',
  full_name_ru = 'Тунисская Республика',
  pan_european = false
WHERE
  country_iso = 'TUN';

UPDATE
  country
SET
  list_name_en = 'Turkey',
  full_name_en = 'the Republic of Turkey',
  list_name_es = 'Turquía',
  full_name_es = 'la República de Turquía',
  list_name_fr = 'Turquie',
  full_name_fr = 'la République turque',
  list_name_ru = 'Турция',
  full_name_ru = 'Турецкая Республика',
  pan_european = true
WHERE
  country_iso = 'TUR';

UPDATE
  country
SET
  list_name_en = 'Turkmenistan',
  full_name_en = 'Turkmenistan',
  list_name_es = 'Turkmenistán',
  full_name_es = 'Turkmenistán',
  list_name_fr = 'Turkménistan',
  full_name_fr = 'le Turkménistan',
  list_name_ru = 'Туркменистан',
  full_name_ru = 'Туркменистан',
  pan_european = false
WHERE
  country_iso = 'TKM';

UPDATE
  country
SET
  list_name_en = 'Turks and Caicos Islands',
  full_name_en = 'Turks and Caicos Islands',
  list_name_es = 'Islas Turcas y Caicos',
  full_name_es = 'Islas Turcas y Caicos',
  list_name_fr = 'Îles Turques et Caïques',
  full_name_fr = 'les Îles Turques et Caïques',
  list_name_ru = 'острова Тёркс и Кайкос',
  full_name_ru = 'острова Тёркс и Кайкос',
  pan_european = false
WHERE
  country_iso = 'TCA';

UPDATE
  country
SET
  list_name_en = 'Tuvalu',
  full_name_en = 'Tuvalu',
  list_name_es = 'Tuvalu',
  full_name_es = 'Tuvalu',
  list_name_fr = 'Tuvalu',
  full_name_fr = 'les Tuvalu',
  list_name_ru = 'Тувалу',
  full_name_ru = 'Тувалу',
  pan_european = false
WHERE
  country_iso = 'TUV';

UPDATE
  country
SET
  list_name_en = 'Uganda',
  full_name_en = 'the Republic of Uganda',
  list_name_es = 'Uganda',
  full_name_es = 'la República de Uganda',
  list_name_fr = 'Ouganda',
  full_name_fr = 'la République de l''Ouganda',
  list_name_ru = 'Уганда',
  full_name_ru = 'Республика Уганда',
  pan_european = false
WHERE
  country_iso = 'UGA';

UPDATE
  country
SET
  list_name_en = 'Ukraine',
  full_name_en = 'Ukraine',
  list_name_es = 'Ucrania',
  full_name_es = 'Ucrania',
  list_name_fr = 'Ukraine',
  full_name_fr = 'l''Ukraine',
  list_name_ru = 'Украина',
  full_name_ru = 'Украина',
  pan_european = true
WHERE
  country_iso = 'UKR';

UPDATE
  country
SET
  list_name_en = 'United Arab Emirates',
  full_name_en = 'the United Arab Emirates',
  list_name_es = 'Emiratos Árabes Unidos',
  full_name_es = 'los Emiratos Árabes Unidos',
  list_name_fr = 'Émirats arabes unis',
  full_name_fr = 'les Émirats arabes unis',
  list_name_ru = 'Объединенные Арабские Эмираты',
  full_name_ru = 'Объединенные Арабские Эмираты',
  pan_european = false
WHERE
  country_iso = 'ARE';

UPDATE
  country
SET
  list_name_en = 'United Kingdom',
  full_name_en = 'the United Kingdom of Great Britain and Northern Ireland',
  list_name_es = 'Reino Unido',
  full_name_es = 'el Reino Unido (de Gran Bretaña e Irlanda del Norte)',
  list_name_fr = 'Royaume-Uni',
  full_name_fr = 'le Royaume-Uni de Grande-Bretagne et d''Irlande du Nord',
  list_name_ru = 'Соединенное Королевство',
  full_name_ru = 'Соединенное Королевство Великобритании и Северной Ирландии',
  pan_european = true
WHERE
  country_iso = 'GBR';

UPDATE
  country
SET
  list_name_en = 'United Republic of Tanzania',
  full_name_en = 'the United Republic of Tanzania',
  list_name_es = 'República Unida de Tanzanía',
  full_name_es = 'la República Unida de Tanzanía',
  list_name_fr = 'République-Unie de Tanzanie',
  full_name_fr = 'la République-Unie de Tanzanie',
  list_name_ru = 'Объединенная Республика Танзания',
  full_name_ru = 'Объединенная Республика Танзания',
  pan_european = false
WHERE
  country_iso = 'TZA';

UPDATE
  country
SET
  list_name_en = 'United States of America',
  full_name_en = 'the United States of America',
  list_name_es = 'Estados Unidos de América',
  full_name_es = 'los Estados Unidos de América',
  list_name_fr = 'États-Unis d''Amérique',
  full_name_fr = 'les États-Unis d''Amérique',
  list_name_ru = 'Соединенные Штаты Америки',
  full_name_ru = 'Соединенные Штаты Америки',
  pan_european = false
WHERE
  country_iso = 'USA';

UPDATE
  country
SET
  list_name_en = 'United States Virgin Islands',
  full_name_en = 'the United States Virgin Islands',
  list_name_es = 'Islas Vírgenes (EE.UU.)',
  full_name_es = 'las Islas Vírgenes (EE.UU.)',
  list_name_fr = 'Îles Vierges américaines',
  full_name_fr = 'les Îles Vierges américaines',
  list_name_ru = 'Виргинские острова США',
  full_name_ru = 'Виргинские острова Соединенных Штатов',
  pan_european = false
WHERE
  country_iso = 'VIR';

UPDATE
  country
SET
  list_name_en = 'Uruguay',
  full_name_en = 'the Eastern Republic of Uruguay',
  list_name_es = 'Uruguay',
  full_name_es = 'la República Oriental del Uruguay',
  list_name_fr = 'Uruguay',
  full_name_fr = 'la République orientale de l''Uruguay',
  list_name_ru = 'Уругвай',
  full_name_ru = 'Восточная Республика Уругвай',
  pan_european = false
WHERE
  country_iso = 'URY';

UPDATE
  country
SET
  list_name_en = 'Uzbekistan',
  full_name_en = 'the Republic of Uzbekistan',
  list_name_es = 'Uzbekistán',
  full_name_es = 'la República de Uzbekistán',
  list_name_fr = 'Ouzbékistan',
  full_name_fr = 'la République d''Ouzbékistan',
  list_name_ru = 'Узбекистан',
  full_name_ru = 'Республика Узбекистан',
  pan_european = false
WHERE
  country_iso = 'UZB';

UPDATE
  country
SET
  list_name_en = 'Vanuatu',
  full_name_en = 'the Republic of Vanuatu',
  list_name_es = 'Vanuatu',
  full_name_es = 'la República de Vanuatu',
  list_name_fr = 'Vanuatu',
  full_name_fr = 'la République du Vanuatu',
  list_name_ru = 'Вануату',
  full_name_ru = 'Республика Вануату',
  pan_european = false
WHERE
  country_iso = 'VUT';

UPDATE
  country
SET
  list_name_en = 'Venezuela (Bolivarian Republic of)',
  full_name_en = 'the Bolivarian Republic of Venezuela',
  list_name_es = 'Venezuela (República Bolivariana de)',
  full_name_es = 'la República Bolivariana de Venezuela',
  list_name_fr = 'Venezuela (République bolivarienne du)',
  full_name_fr = 'la République bolivarienne du Venezuela',
  list_name_ru = 'Венесуэла (Боливарианская Республика)',
  full_name_ru = 'Боливарианская Республика Венесуэла',
  pan_european = false
WHERE
  country_iso = 'VEN';

UPDATE
  country
SET
  list_name_en = 'Viet Nam',
  full_name_en = 'the Socialist Republic of Viet Nam',
  list_name_es = 'Viet Nam',
  full_name_es = 'la República Socialista de Viet Nam',
  list_name_fr = 'Viet Nam',
  full_name_fr = 'la République socialiste du Viet Nam',
  list_name_ru = 'Вьетнам',
  full_name_ru = 'Социалистическая Республика Вьетнам',
  pan_european = false
WHERE
  country_iso = 'VNM';

UPDATE
  country
SET
  list_name_en = 'Wallis and Futuna Islands',
  full_name_en = 'Wallis and Futuna Islands',
  list_name_es = 'Islas Wallis y Futuna',
  full_name_es = 'Islas Wallis y Futuna',
  list_name_fr = 'Îles Wallis et Futuna',
  full_name_fr = 'les Îles Wallis et Futuna',
  list_name_ru = 'острова Уоллис и Футуна',
  full_name_ru = 'острова Уоллис и Футуна',
  pan_european = false
WHERE
  country_iso = 'WLF';

UPDATE
  country
SET
  list_name_en = 'Western Sahara',
  full_name_en = 'Western Sahara',
  list_name_es = 'Sáhara occidental',
  full_name_es = 'Sáhara occidental',
  list_name_fr = 'Sahara occidental',
  full_name_fr = 'Sahara occidental',
  list_name_ru = 'Западная Сахара',
  full_name_ru = 'Западная Сахара',
  pan_european = false
WHERE
  country_iso = 'ESH';

UPDATE
  country
SET
  list_name_en = 'Yemen',
  full_name_en = 'the Republic of Yemen',
  list_name_es = 'Yemen',
  full_name_es = 'la República del Yemen',
  list_name_fr = 'Yémen',
  full_name_fr = 'la République du Yémen',
  list_name_ru = 'Йемен',
  full_name_ru = 'Йеменская Республика',
  pan_european = false
WHERE
  country_iso = 'YEM';

UPDATE
  country
SET
  list_name_en = 'Zambia',
  full_name_en = 'the Republic of Zambia',
  list_name_es = 'Zambia',
  full_name_es = 'la República de Zambia',
  list_name_fr = 'Zambie',
  full_name_fr = 'la République de Zambie',
  list_name_ru = 'Замбия',
  full_name_ru = 'Республика Замбия',
  pan_european = false
WHERE
  country_iso = 'ZMB';

UPDATE
  country
SET
  list_name_en = 'Zimbabwe',
  full_name_en = 'the Republic of Zimbabwe',
  list_name_es = 'Zimbabwe',
  full_name_es = 'la República de Zimbabwe',
  list_name_fr = 'Zimbabwe',
  full_name_fr = 'la République du Zimbabwe',
  list_name_ru = 'Зимбабве',
  full_name_ru = 'Республика Зимбабве',
  pan_european = false
WHERE
  country_iso = 'ZWE';

