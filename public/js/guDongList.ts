type GuListItem = {
  id: string;
  value: string;
  label: string;
};

type DongListItem = {
  gu: string;
  value: string | number;
  label: string;
};

export const GuList: GuListItem[] = [
  { id: '1', value: '110', label: 'Jongno-gu' },
  { id: '2', value: '140', label: 'Jung-gu' },
  { id: '3', value: '170', label: 'Yongsan-gu' },
  { id: '4', value: '200', label: 'Seongdong-gu' },
  { id: '5', value: '215', label: 'Gwangjin-gu' },
  { id: '6', value: '230', label: 'Dongdaemun-gu' },
  { id: '7', value: '260', label: 'Jungnang-gu' },
  { id: '8', value: '290', label: 'Seongbuk-gu' },
  { id: '9', value: '305', label: 'Gangbuk-gu' },
  { id: '10', value: '320', label: 'Dobong-gu' },
  { id: '11', value: '350', label: 'Nowon-gu' },
  { id: '12', value: '380', label: 'Eunpyeong-gu' },
  { id: '13', value: '410', label: 'Seodaemun-gu' },
  { id: '14', value: '440', label: 'Mapo-gu' },
  { id: '15', value: '470', label: 'Yangcheon-gu' },
  { id: '16', value: '500', label: 'Gangseo-gu' },
  { id: '17', value: '530', label: 'Guro-gu' },
  { id: '18', value: '545', label: 'Geumcheon-gu' },
  { id: '19', value: '560', label: 'Yeongdeungpo-gu' },
  { id: '20', value: '590', label: 'Dongjak-gu' },
  { id: '21', value: '620', label: 'Gwanak-gu' },
  { id: '22', value: '650', label: 'Seocho-gu' },
  { id: '23', value: '680', label: 'Gangnam-gu' },
  { id: '24', value: '710', label: 'Songpa-gu' },
  { id: '25', value: '740', label: 'Gangdong-gu' },
];

export const DongList: DongListItem[] = [
  { gu: '110', value: '515', label: 'Cheongunhyoja-dong' },
  { gu: '110', value: '530', label: 'Sajik-dong' },
  { gu: '110', value: '540', label: 'Samcheong-dong' },
  { gu: '110', value: '550', label: 'Buam-dong' },
  { gu: '110', value: '560', label: 'Pyongchang-dong' },
  { gu: '110', value: '570', label: 'Muak-dong' },
  { gu: '110', value: '580', label: 'Gyonam-dong' },
  { gu: '110', value: '600', label: 'Gahoe-dong' },
  { gu: '110', value: '615', label: 'Jongno 1.2.3.4-dong' },
  { gu: '110', value: '630', label: 'Jongno 5.6-gadong' },
  { gu: '110', value: '640', label: 'Ehwa-dong' },
  { gu: '110', value: '650', label: 'Hyehwa-dong' },
  { gu: '110', value: '670', label: 'Changsinje1-dong' },
  { gu: '110', value: '680', label: 'Changsinje2-dong' },
  { gu: '110', value: '690', label: 'Changsinje3-dong' },
  { gu: '110', value: '700', label: 'Sunginje1-dong' },
  { gu: '110', value: '710', label: 'Sunginje2-dong' },
  { gu: '140', value: '520', label: 'Sogong-dong' },
  { gu: '140', value: '540', label: 'HoeHyeon-dong' },
  { gu: '140', value: '550', label: 'Myeong-dong' },
  { gu: '140', value: '570', label: 'Pil-dong' },
  { gu: '140', value: '580', label: 'Jangchung-dong' },
  { gu: '140', value: '590', label: 'Gwanghui-dong' },
  { gu: '140', value: '605', label: 'Euljiro-dong' },
  { gu: '140', value: '615', label: 'Sindang-dong' },
  { gu: '140', value: '625', label: 'Dasan-dong' },
  { gu: '140', value: '635', label: 'Yaksu-dong' },
  { gu: '140', value: '645', label: 'Cheonggu-dong' },
  { gu: '140', value: '650', label: 'Sindang 5(o)-dong' },
  { gu: '140', value: '665', label: 'Donghwa-dong' },
  { gu: '140', value: '670', label: 'Hwanghak-dong' },
  { gu: '140', value: '680', label: 'Jungnim-dong' },
  { gu: '170', value: '510', label: 'Huam-dong' },
  { gu: '170', value: '520', label: 'Yongsan 2(i)ga-dong' },
  { gu: '170', value: '530', label: 'Namyeong-dong' },
  { gu: '170', value: '555', label: 'Cheongpa-dong' },
  { gu: '170', value: '560', label: 'Wonhyoro 1(il)-dong' },
  { gu: '170', value: '570', label: 'Wonhyoro 2(i)-dong' },
  { gu: '170', value: '580', label: 'Hyochang-dong' },
  { gu: '170', value: '590', label: 'Yongmun-dong' },
  { gu: '170', value: '625', label: 'Hangangno-dong' },
  { gu: '170', value: '630', label: 'Ichon 1(il)-dong' },
  { gu: '170', value: '640', label: 'Ichon 2(i)-dong' },
  { gu: '170', value: '650', label: 'Itaewon 1(il)-dong' },
  { gu: '170', value: '660', label: 'Itaewon 2(i)-dong' },
  { gu: '170', value: '685', label: 'Hannam-dong' },
  { gu: '170', value: '690', label: 'Seobingodong' },
  { gu: '170', value: '700', label: 'Bogwang-dong' },
  { gu: '200', value: '520', label: 'Wangsimlije 2-dong' },
  { gu: '200', value: '535', label: 'Wangsimnidosun-dong' },
  { gu: '200', value: '540', label: 'Majang-dong' },
  { gu: '200', value: '550', label: 'Sagun-dong' },
  { gu: '200', value: '560', label: 'Hangdangje 1-dong' },
  { gu: '200', value: '570', label: 'Hangdangje 2-dong' },
  { gu: '200', value: '580', label: 'Eungbong-dong' },
  { gu: '200', value: '590', label: 'Kumho 1-ga-dong' },
  { gu: '200', value: '615', label: 'Kumho 2.3' },
  { gu: '200', value: '620', label: 'Kumho4 ga-dong' },
  { gu: '200', value: '645', label: 'Oksu-dong' },
  { gu: '200', value: '650', label: 'Seongsu 1-gaje 1-dong' },
  { gu: '200', value: '660', label: 'Seongsu 1-gaje 2-dong' },
  { gu: '200', value: '670', label: 'Seongsu 2-gaje 1-dong' },
  { gu: '200', value: '690', label: 'Seongsu2gaje3dong' },
  { gu: '200', value: '720', label: 'Songjeong-dong' },
  { gu: '200', value: '790', label: 'Yongdap-dong' },
  { gu: '215', value: '710', label: 'Hwayang-dong' },
  { gu: '215', value: '730', label: 'Gunja-dong' },
  { gu: '215', value: '740', label: 'Junggokje 1-dong' },
  { gu: '215', value: '750', label: 'Junggokje 2-dong' },
  { gu: '215', value: '760', label: 'Junggokje 3-dong' },
  { gu: '215', value: '770', label: 'Junggokje 4-dong' },
  { gu: '215', value: '780', label: 'Neung-dong' },
  { gu: '215', value: '810', label: 'Gwangjang-dong' },
  { gu: '215', value: '820', label: 'Jiyangje 1-dong' },
  { gu: '215', value: '830', label: 'Jiyangje 2-dong' },
  { gu: '215', value: '840', label: 'Jiyangje 3-dong' },
  { gu: '215', value: '847', label: 'Jiyangje 4-dong' },
  { gu: '215', value: '850', label: 'Guuije 1-dong' },
  { gu: '215', value: '860', label: 'Guuije 2-dong' },
  { gu: '215', value: '870', label: 'Guuije 3-dong' },
  { gu: '230', value: '536', label: 'Yongshin-dong' },
  { gu: '230', value: '545', label: 'Jaejeong-dong' },
  { gu: '230', value: '560', label: 'Jeonnongje 1-dong' },
  { gu: '230', value: '570', label: 'Jeonnongje 2-dong' },
  { gu: '230', value: '600', label: 'Dapseoprije 1-dong' },
  { gu: '230', value: '610', label: 'Dapsiprije 2-dong' },
  { gu: '230', value: '650', label: 'Changan 1-dong' },
  { gu: '230', value: '660', label: 'Janganje 2-dong' },
  { gu: '230', value: '705', label: 'Cheongnyang-ri-dong' },
  { gu: '230', value: '710', label: 'Hoegi-dong' },
  { gu: '230', value: '720', label: 'Hwigyeongje 1-dong' },
  { gu: '230', value: '730', label: 'Hwigyeongje 2-dong' },
  { gu: '230', value: '740', label: 'Imunje 1-dong' },
  { gu: '230', value: '750', label: 'Imunje 2-dong' },
  { gu: '260', value: '520', label: 'Myeonmokje 2-dong' },
  { gu: '260', value: '540', label: 'Myeonmokje 4-dong' },
  { gu: '260', value: '550', label: 'Myeonmokje 5-dong' },
  { gu: '260', value: '565', label: 'Myeonmok bon-dong ' },
  { gu: '260', value: '570', label: 'Myeonmokje 7-dong' },
  { gu: '260', value: '575', label: 'Myeonmokje 3.8-dong' },
  { gu: '260', value: '580', label: 'Sangbongje 1-dong' },
  { gu: '260', value: '590', label: 'Sangbongje 2-dong' },
  { gu: '260', value: '600', label: 'junghwaje 1-dong' },
  { gu: '260', value: '610', label: 'junghwaje 2-dong' },
  { gu: '260', value: '620', label: 'Mukje 1-dong' },
  { gu: '260', value: '630', label: 'Mukje2-dong' },
  { gu: '260', value: '655', label: 'Mangwoobondong' },
  { gu: '260', value: '660', label: 'Mangwooje3dong' },
  { gu: '260', value: '680', label: 'Sinnae 1-dong' },
  { gu: '260', value: '690', label: 'Sinnae 2-dong' },
  { gu: '290', value: '525', label: 'Seongbukdong' },
  { gu: '290', value: '555', label: 'Samsun-dong' },
  { gu: '290', value: '575', label: 'Dongseon-dong' },
  { gu: '290', value: '580', label: 'Donamje 1-dong' },
  { gu: '290', value: '590', label: 'Donamje 2-dong' },
  { gu: '290', value: '600', label: 'Anam-dong' },
  { gu: '290', value: '610', label: 'Bomun-dong' },
  { gu: '290', value: '620', label: 'Jeongneungje 1-dong' },
  { gu: '290', value: '630', label: 'Jeongneungje 2-dong' },
  { gu: '290', value: '640', label: 'Jeongneungje 3-dong' },
  { gu: '290', value: '650', label: 'Jeongneungje 4-dong' },
  { gu: '290', value: '660', label: 'Gilumje 1-dong' },
  { gu: '290', value: '685', label: 'Gilumje2-dong' },
  { gu: '290', value: '705', label: 'Jongam-dong' },
  { gu: '290', value: '715', label: 'Wolgokje 1-dong' },
  { gu: '290', value: '725', label: 'Wolgokje 2-dong' },
  { gu: '290', value: '760', label: 'Jangwije 1-dong' },
  { gu: '290', value: '770', label: 'Jangwije2-dong' },
  { gu: '290', value: '780', label: 'Jangwijeong 3-dong' },
  { gu: '290', value: '810', label: 'Seokgwan-dong' },
  { gu: '305', value: '534', label: 'Samyang-dong' },
  { gu: '305', value: '535', label: 'Miadong' },
  { gu: '305', value: '545', label: 'Songjungdong' },
  { gu: '305', value: '555', label: 'Songcheon-dong' },
  { gu: '305', value: '575', label: 'Samkaksan-dong' },
  { gu: '305', value: '595', label: 'Byeon 1-dong' },
  { gu: '305', value: '603', label: 'Byeon 2-dong' },
  { gu: '305', value: '608', label: 'Byeon 3-dong' },
  { gu: '305', value: '615', label: 'Suyu 1-dong' },
  { gu: '305', value: '625', label: 'Suyu 2-dong' },
  { gu: '305', value: '635', label: 'Suyu 3-dong' },
  { gu: '305', value: '645', label: 'U-i dong' },
  { gu: '305', value: '660', label: 'Insu-dong' },
  { gu: '320', value: '511', label: 'Changje 1-dong' },
  { gu: '320', value: '512', label: 'Changje2-dong' },
  { gu: '320', value: '513', label: 'Changje 3-dong' },
  { gu: '320', value: '514', label: 'Changje 4-dong' },
  { gu: '320', value: '515', label: 'Changje 5-dong' },
  { gu: '320', value: '521', label: 'Dobongje 1-dong' },
  { gu: '320', value: '522', label: 'Dobongje 2-dong' },
  { gu: '320', value: '660', label: 'Ssangmunje 1-dong' },
  { gu: '320', value: '670', label: 'Ssangmunje 2-dong' },
  { gu: '320', value: '680', label: 'Ssangmunje 3-dong' },
  { gu: '320', value: '681', label: 'Ssangmunje 4-dong' },
  { gu: '320', value: '690', label: 'Banghakje 1-dong' },
  { gu: '320', value: '700', label: 'Banghakje 2-dong' },
  { gu: '320', value: '710', label: 'Banghakje 3-dong' },
  { gu: '350', value: '560', label: 'Wolgye 1-dong' },
  { gu: '350', value: '570', label: 'Wolgye 2-dong' },
  { gu: '350', value: '580', label: 'Wolgye 3-dong' },
  { gu: '350', value: '595', label: 'Gongneung 1-dong' },
  { gu: '350', value: '600', label: 'Gongneung 2-dong' },
  { gu: '350', value: '611', label: 'Hagye 1-dong' },
  { gu: '350', value: '612', label: 'Hagye 2-dong' },
  { gu: '350', value: '619', label: 'Jungkyebon-dong' },
  { gu: '350', value: '621', label: 'Jungkye 1-dong' },
  { gu: '350', value: '624', label: 'Jungkye 4-dong' },
  { gu: '350', value: '625', label: 'Jungkye 2.3-dong' },
  { gu: '350', value: '630', label: 'Sang-gye 1-dong' },
  { gu: '350', value: '640', label: 'Sang-gye 2-dong' },
  { gu: '350', value: '665', label: 'Sang-gye 3.4-dong' },
  { gu: '350', value: '670', label: 'Sang-gye 5-dong' },
  { gu: '350', value: '695', label: 'Sang-gye 6.7 dong' },
  { gu: '350', value: '700', label: 'Sang-gye 8 dong' },
  { gu: '350', value: '710', label: 'Sang-gye 9 dong' },
  { gu: '350', value: '720', label: 'Sang-gye 10 dong' },
  { gu: '380', value: '510', label: 'Nokbun-dong' },
  { gu: '380', value: '520', label: 'Bulgwangje 1-dong' },
  { gu: '380', value: '530', label: 'Bulgwangje 2-dong' },
  { gu: '380', value: '551', label: 'Galhyeonje 1-dong' },
  { gu: '380', value: '552', label: 'Galhyeonje 2-dong' },
  { gu: '380', value: '560', label: 'Gusan-dong' },
  { gu: '380', value: '570', label: 'Daejo-dong' },
  { gu: '380', value: '580', label: 'Eungamje1-dong' },
  { gu: '380', value: '590', label: 'Eungamje2-dong' },
  { gu: '380', value: '600', label: 'Eungamje3-dong' },
  { gu: '380', value: '625', label: 'Yeokchon-dong' },
  { gu: '380', value: '631', label: 'Sinsaje 1-dong' },
  { gu: '380', value: '632', label: 'Sinsaje 2-dong' },
  { gu: '380', value: '640', label: 'Jeungsan dong' },
  { gu: '380', value: '650', label: 'Susaeg dong' },
  { gu: '380', value: '690', label: 'Jingguan-dong' },
  { gu: '410', value: '520', label: 'Cheon-yeon dong' },
  { gu: '410', value: '555', label: 'Bukahyeon-dong' },
  { gu: '410', value: '565', label: 'Chunghyeon-dong' },
  { gu: '410', value: '585', label: 'Sinchon-dong' },
  { gu: '410', value: '615', label: 'Yeonhee-dong' },
  { gu: '410', value: '620', label: 'Hongjeje 1-dong' },
  { gu: '410', value: '640', label: 'Hongjeje 3-dong' },
  { gu: '410', value: '655', label: 'Hongjeje 2-dong' },
  { gu: '410', value: '660', label: 'Hongeunje 1-dong' },
  { gu: '410', value: '685', label: 'Hongeunje 2-dong' },
  { gu: '410', value: '690', label: 'Namgajwaje 1-dong' },
  { gu: '410', value: '700', label: 'Namgajwaje 2-dong' },
  { gu: '410', value: '710', label: 'Bukgajaje 1-dong' },
  { gu: '410', value: '720', label: 'Bukgajajeong 2-dong' },
  { gu: '440', value: '555', label: 'Ahyeon-dong' },
  { gu: '440', value: '565', label: 'Gongdeok-dong' },
  { gu: '440', value: '585', label: 'Dowhwa-dong' },
  { gu: '440', value: '590', label: 'Yonggang-dong' },
  { gu: '440', value: '600', label: 'Daeheung-dong' },
  { gu: '440', value: '610', label: 'Yeomri-dong' },
  { gu: '440', value: '630', label: 'Sinsudong' },
  { gu: '440', value: '655', label: 'Seogang-dong' },
  { gu: '440', value: '660', label: 'Seogyo-dong' },
  { gu: '440', value: '680', label: 'Hapjeong-dong' },
  { gu: '440', value: '690', label: 'Mangwon 1-dong' },
  { gu: '440', value: '700', label: 'Mangwon 2nd Building' },
  { gu: '440', value: '710', label: 'Yeonnam-dong' },
  { gu: '440', value: '720', label: 'Seongsanje 1-dong' },
  { gu: '440', value: '730', label: 'Seongsanje 2-dong' },
  { gu: '440', value: '740', label: 'Sangam-dong' },
  { gu: '470', value: '510', label: 'Mok1-dong' },
  { gu: '470', value: '520', label: 'Mok2-dong' },
  { gu: '470', value: '530', label: 'Mok3-dong' },
  { gu: '470', value: '540', label: 'Mok4-dong' },
  { gu: '470', value: '550', label: 'Mok5-dong' },
  { gu: '470', value: '560', label: 'Shinyueol 1-dong' },
  { gu: '470', value: '570', label: 'Shinyueol 2-dong' },
  { gu: '470', value: '580', label: 'Shinyueol 3-dong' },
  { gu: '470', value: '590', label: 'Shinyueol 4-dong' },
  { gu: '470', value: '600', label: 'Shinyueol 5-dong' },
  { gu: '470', value: '610', label: 'Shinyueol 6-dong' },
  { gu: '470', value: '611', label: 'Shinyueol 7-dong' },
  { gu: '470', value: '620', label: 'Shinjeong 1-dong' },
  { gu: '470', value: '630', label: 'Shinjeong 2-dong' },
  { gu: '470', value: '640', label: 'Shinjeong 3-dong' },
  { gu: '470', value: '650', label: 'Shinjeong 4-dong' },
  { gu: '470', value: '670', label: 'Shinjeong 6-dong' },
  { gu: '470', value: '680', label: 'Shinjeong 7-dong' },
  { gu: '500', value: '510', label: 'Yeomchang-dong' },
  { gu: '500', value: '520', label: 'Dalseongje 1-dong' },
  { gu: '500', value: '530', label: 'Dalseongje 2-dong' },
  { gu: '500', value: '535', label: 'Dalseongje 3-dong' },
  { gu: '500', value: '540', label: 'Hwagokje 1-dong' },
  { gu: '500', value: '550', label: 'Hwagokje 2-dong' },
  { gu: '500', value: '560', label: 'Hwagokje 3-dong' },
  { gu: '500', value: '570', label: 'Hwagokje 4-dong' },
  { gu: '500', value: '590', label: 'Hwagokbon-dong' },
  { gu: '500', value: '591', label: 'Hwagokje 6-dong' },
  { gu: '500', value: '593', label: 'Hwagokje 8-dong' },
  { gu: '500', value: '603', label: 'Gaeyangje 1-dong' },
  { gu: '500', value: '604', label: 'Gaeyangje 2-dong' },
  { gu: '500', value: '605', label: 'Gaeyangje 3-dong' },
  { gu: '500', value: '611', label: 'Balsanje 1-dong' },
  { gu: '500', value: '615', label: 'Wujangshan-dong' },
  { gu: '500', value: '620', label: 'Gonghang-dong' },
  { gu: '500', value: '630', label: 'Banghwaje 1-dong' },
  { gu: '500', value: '640', label: 'Bangwhaje 2-dong' },
  { gu: '500', value: '641', label: 'Bangwhaje 3-dong' },
  { gu: '530', value: '510', label: 'Sindorim-dong' },
  { gu: '530', value: '520', label: 'Guroje 1-dong' },
  { gu: '530', value: '530', label: 'Guroje 2-dong' },
  { gu: '530', value: '540', label: 'Guroje 3-dong' },
  { gu: '530', value: '550', label: 'Guroje 4-dong' },
  { gu: '530', value: '560', label: 'Guroje 5-dong' },
  { gu: '530', value: '595', label: 'Garibong-dong' },
  { gu: '530', value: '720', label: 'Gocheokje 1-dong' },
  { gu: '530', value: '730', label: 'Gocheokje 2-dong' },
  { gu: '530', value: '740', label: 'Gaebongje 1-dong' },
  { gu: '530', value: '750', label: 'Gaebongje 2-dong' },
  { gu: '530', value: '760', label: 'Gaebongje 3-dong' },
  { gu: '530', value: '770', label: 'olyuje 1-dong' },
  { gu: '530', value: '780', label: 'olyuje 2-dong' },
  { gu: '530', value: '790', label: 'Sugung-dong' },
  { gu: '545', value: '510', label: 'Gasan-dong' },
  { gu: '545', value: '610', label: 'Doksanje 1-dong' },
  { gu: '545', value: '620', label: 'Doksanje 2-dong' },
  { gu: '545', value: '630', label: 'Doksanje 3-dong' },
  { gu: '545', value: '640', label: 'Doksanje 4-dong' },
  { gu: '545', value: '670', label: 'Siheungje 1-dong' },
  { gu: '545', value: '680', label: 'Siheungje 2-dong' },
  { gu: '545', value: '690', label: 'Siheungje 3-dong' },
  { gu: '545', value: '700', label: 'Siheungje 4-dong' },
  { gu: '545', value: '710', label: 'Siheungje 5-dong' },
  { gu: '560', value: '515', label: 'Yeongdeungpo main-dong' },
  { gu: '560', value: '535', label: 'Yeongdeungpo-dong' },
  { gu: '560', value: '540', label: 'Yeoui-dong' },
  { gu: '560', value: '550', label: 'Dangsanje 1-dong' },
  { gu: '560', value: '560', label: 'Dangsanje 2-dong' },
  { gu: '560', value: '585', label: 'Dorim-dong' },
  { gu: '560', value: '605', label: 'Munrae-dong' },
  { gu: '560', value: '610', label: 'Yangpyeongje 1-dong' },
  { gu: '560', value: '620', label: 'Yangpyeongje 2-dong' },
  { gu: '560', value: '630', label: 'Shingilje 1-dong' },
  { gu: '560', value: '650', label: 'Shingilje 3-dong' },
  { gu: '560', value: '660', label: 'Shingilje 4-dong' },
  { gu: '560', value: '670', label: 'Shingilje 5-dong' },
  { gu: '560', value: '680', label: 'Shingilje 6-dong' },
  { gu: '560', value: '690', label: 'Shingilje 7-dong' },
  { gu: '560', value: '700', label: 'Daerimje 1-dong' },
  { gu: '560', value: '710', label: 'Daerimje 2-dong' },
  { gu: '560', value: '720', label: 'Daelimje 3-dong' },
  { gu: '590', value: '510', label: 'Noryangjinje 1-dong' },
  { gu: '590', value: '520', label: 'Noryangjinje 2-dong' },
  { gu: '590', value: '530', label: 'Sangdoje 1-dong' },
  { gu: '590', value: '540', label: 'Sangdoje 2-dong' },
  { gu: '590', value: '550', label: 'Sangdoje 3-dong' },
  { gu: '590', value: '560', label: 'Sangdoje 4-dong' },
  { gu: '590', value: '605', label: 'Heugseog dong' },
  { gu: '590', value: '620', label: 'Sadangje 1-dong' },
  { gu: '590', value: '630', label: 'Sadangje 2-dong' },
  { gu: '590', value: '640', label: 'Sadangje 3-dong' },
  { gu: '590', value: '650', label: 'Sadangje 4-dong' },
  { gu: '590', value: '651', label: 'Sadangje 5-dong' },
  { gu: '590', value: '660', label: 'Daebang-dong' },
  { gu: '590', value: '670', label: 'Sindaebangje 1-dong' },
  { gu: '590', value: '680', label: 'Sindaebangje 2-dong' },
  { gu: '620', value: '525', label: 'Boramae-dong' },
  { gu: '620', value: '545', label: 'Cheonglim-dong' },
  { gu: '620', value: '565', label: 'Seonghyeon-dong' },
  { gu: '620', value: '575', label: 'haengun dong' },
  { gu: '620', value: '585', label: 'Nakseongdae-dong' },
  { gu: '620', value: '595', label: 'Cheongnyong-dong' },
  { gu: '620', value: '605', label: 'Euncheon-dong' },
  { gu: '620', value: '615', label: 'Jungang-dong' },
  { gu: '620', value: '625', label: 'Inheon-dong' },
  { gu: '620', value: '630', label: 'Namhyeon-dong' },
  { gu: '620', value: '645', label: 'Seowon-dong' },
  { gu: '620', value: '655', label: 'Sinwon-dong' },
  { gu: '620', value: '665', label: 'Seorim-dong' },
  { gu: '620', value: '685', label: 'Sinsa-dong' },
  { gu: '620', value: '695', label: 'Sillim-dong' },
  { gu: '620', value: '715', label: 'Nanyang-dong' },
  { gu: '620', value: '725', label: 'Jowon-dong' },
  { gu: '620', value: '735', label: 'Daehak-dong' },
  { gu: '620', value: '745', label: 'Samseong-dong' },
  { gu: '620', value: '765', label: 'Miseong dong' },
  { gu: '620', value: '775', label: 'Nangok-dong' },
  { gu: '650', value: '510', label: 'Seocho 1-dong' },
  { gu: '650', value: '520', label: 'Seocho 2-dong' },
  { gu: '650', value: '530', label: 'Seocho 3-dong' },
  { gu: '650', value: '531', label: 'Seocho 4-dong' },
  { gu: '650', value: '540', label: 'Jamwon-dong' },
  { gu: '650', value: '550', label: 'Banpobon-dong' },
  { gu: '650', value: '560', label: 'Banpo 1-dong' },
  { gu: '650', value: '570', label: 'Banpo 2-dong' },
  { gu: '650', value: '580', label: 'Banpo 3-dong' },
  { gu: '650', value: '581', label: 'Banpo 4-dong' },
  { gu: '650', value: '590', label: 'Bangbaebon-dong' },
  { gu: '650', value: '600', label: 'Bangbae 1-dong' },
  { gu: '650', value: '610', label: 'Bangbae 2-dong' },
  { gu: '650', value: '620', label: 'Bangbae 3-dong' },
  { gu: '650', value: '621', label: 'Bangbae 4-dong' },
  { gu: '650', value: '651', label: 'Yangjae1-dong' },
  { gu: '650', value: '652', label: 'Yangjae2-dong' },
  { gu: '650', value: '660', label: 'Naegok-dong' },
  { gu: '680', value: '510', label: 'Sinsa-dong' },
  { gu: '680', value: '521', label: 'Nonhyeon 1-dong' },
  { gu: '680', value: '531', label: 'Nonhyeon 2-dong' },
  { gu: '680', value: '545', label: 'Apgujeong-dong' },
  { gu: '680', value: '565', label: 'Cheongdam-dong' },
  { gu: '680', value: '580', label: 'Samsung 1-dong' },
  { gu: '680', value: '590', label: 'Samsung 2-dong' },
  { gu: '680', value: '600', label: 'Daechi 1-dong' },
  { gu: '680', value: '610', label: 'Daechi 2-dong' },
  { gu: '680', value: '630', label: 'Daechi 4-dong' },
  { gu: '680', value: '640', label: 'Yeoksam 1-dong' },
  { gu: '680', value: '650', label: 'Yeoksam 2-dong' },
  { gu: '680', value: '655', label: 'Dogok 1-dong' },
  { gu: '680', value: '656', label: 'Dogok 2-dong' },
  { gu: '680', value: '660', label: 'Gaepo 1-dong' },
  { gu: '680', value: '670', label: 'Gaepo 2-dong' },
  { gu: '680', value: '690', label: 'Gaeppo 4-dong' },
  { gu: '680', value: '700', label: 'Segok-dong' },
  { gu: '680', value: '720', label: 'Ilwonbon dong' },
  { gu: '680', value: '730', label: 'Ilwon 1-dong' },
  { gu: '680', value: '740', label: 'Ilwon 2-dong' },
  { gu: '680', value: '750', label: 'Suseo-dong' },
  { gu: '710', value: '510', label: 'Pungnap 1-dong' },
  { gu: '710', value: '520', label: 'Pungnap 2-dong' },
  { gu: '710', value: '531', label: 'Geoyeo 1-dong' },
  { gu: '710', value: '532', label: 'Geoyeo2-dong' },
  { gu: '710', value: '540', label: 'Macheon 1-dong' },
  { gu: '710', value: '550', label: 'Macheon 2-dong' },
  { gu: '710', value: '561', label: 'Bang-i 1-dong' },
  { gu: '710', value: '562', label: 'Bang-i 2-dong' },
  { gu: '710', value: '566', label: 'Oryun-dong' },
  { gu: '710', value: '570', label: 'Ogeum-dong' },
  { gu: '710', value: '580', label: 'Songpa 1-dong' },
  { gu: '710', value: '590', label: 'Songpa 2-dong' },
  { gu: '710', value: '600', label: 'Seokchon-dong' },
  { gu: '710', value: '610', label: 'Samjeon-dong' },
  { gu: '710', value: '620', label: 'Garakbon-dong' },
  { gu: '710', value: '631', label: 'Garak 1-dong' },
  { gu: '710', value: '632', label: 'Garak 2-dong' },
  { gu: '710', value: '641', label: 'Munjeong 1-dong' },
  { gu: '710', value: '642', label: 'Munjeong 2-dong' },
  { gu: '710', value: '646', label: 'Jangji-dong' },
  { gu: '710', value: '647', label: 'Wirye-dong' },
  { gu: '710', value: '650', label: 'Jamsil bon-dong' },
  { gu: '710', value: '670', label: 'Jamsil 2-dong' },
  { gu: '710', value: '680', label: 'Jamsil 3-dong' },
  { gu: '710', value: '690', label: 'Jamsil 4-dong' },
  { gu: '710', value: '710', label: 'Jamsil 6-dong' },
  { gu: '710', value: '720', label: 'Jamsil 7-dong' },
  { gu: '740', value: '515', label: 'Gangil-dong' },
  { gu: '740', value: '520', label: 'Sangil-dong' },
  { gu: '740', value: '530', label: 'Myeongilje 1-dong' },
  { gu: '740', value: '540', label: 'Myeongilje 2-dong' },
  { gu: '740', value: '550', label: 'Godeokje 1-dong' },
  { gu: '740', value: '560', label: 'Godeokje 2-dong' },
  { gu: '740', value: '570', label: 'Amsaje 1-dong' },
  { gu: '740', value: '580', label: 'Amsaje 2-dong' },
  { gu: '740', value: '590', label: 'Amsaje 3-dong' },
  { gu: '740', value: '600', label: 'Cheonhoje 1-dong' },
  { gu: '740', value: '610', label: 'Cheonhoje 2-dong' },
  { gu: '740', value: '620', label: 'Cheonhoje 3-dong' },
  { gu: '740', value: '640', label: 'Seongnaeje 1-dong' },
  { gu: '740', value: '650', label: 'Seongnaeje 2-dong' },
  { gu: '740', value: '660', label: 'Seongnaeje 3-dong' },
  { gu: '740', value: '685', label: 'Gil-dong' },
  { gu: '740', value: '690', label: 'Dunchon 1-dong' },
  { gu: '740', value: '700', label: 'Dunchon 2-dong' },
];
