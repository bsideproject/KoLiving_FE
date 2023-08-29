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
  { id: '1', value: '110', label: '종로구' },
  { id: '2', value: '140', label: '중구' },
  { id: '3', value: '170', label: '용산구' },
  { id: '4', value: '200', label: '성동구' },
  { id: '5', value: '215', label: '광진구' },
  { id: '6', value: '230', label: '동대문구' },
  { id: '7', value: '260', label: '중랑구' },
  { id: '8', value: '290', label: '성북구' },
  { id: '9', value: '305', label: '강북구' },
  { id: '10', value: '320', label: '도봉구' },
  { id: '11', value: '350', label: '노원구' },
  { id: '12', value: '380', label: '은평구' },
  { id: '13', value: '410', label: '서대문구' },
  { id: '14', value: '440', label: '마포구' },
  { id: '15', value: '470', label: '양천구' },
  { id: '16', value: '500', label: '강서구' },
  { id: '17', value: '530', label: '구로구' },
  { id: '18', value: '545', label: '금천구' },
  { id: '19', value: '560', label: '영등포구' },
  { id: '20', value: '590', label: '동작구' },
  { id: '21', value: '620', label: '관악구' },
  { id: '22', value: '650', label: '서초구' },
  { id: '23', value: '680', label: '강남구' },
  { id: '24', value: '710', label: '송파구' },
  { id: '25', value: '740', label: '강동구' },
];

export const DongList: DongListItem[] = [
  { gu: '110', value: '515', label: '청운효자동' },
  { gu: '110', value: '530', label: '사직동' },
  { gu: '110', value: '540', label: '삼청동' },
  { gu: '110', value: '550', label: '부암동' },
  { gu: '110', value: '560', label: '평창동' },
  { gu: '110', value: '570', label: '무악동' },
  { gu: '110', value: '580', label: '교남동' },
  { gu: '110', value: '600', label: '가회동' },
  { gu: '110', value: '615', label: '종로1.2.3.4가동' },
  { gu: '110', value: '630', label: '종로5.6가동' },
  { gu: '110', value: '640', label: '이화동' },
  { gu: '110', value: '650', label: '혜화동' },
  { gu: '110', value: '670', label: '창신제1동' },
  { gu: '110', value: '680', label: '창신제2동' },
  { gu: '110', value: '690', label: '창신제3동' },
  { gu: '110', value: '700', label: '숭인제1동' },
  { gu: '110', value: '710', label: '숭인제2동' },
  { gu: '140', value: '520', label: '소공동' },
  { gu: '140', value: '540', label: '회현동' },
  { gu: '140', value: '550', label: '명동' },
  { gu: '140', value: '570', label: '필동' },
  { gu: '140', value: '580', label: '장충동' },
  { gu: '140', value: '590', label: '광희동' },
  { gu: '140', value: '605', label: '을지로동' },
  { gu: '140', value: '615', label: '신당동' },
  { gu: '140', value: '625', label: '다산동' },
  { gu: '140', value: '635', label: '약수동' },
  { gu: '140', value: '645', label: '청구동' },
  { gu: '140', value: '650', label: '신당제5동' },
  { gu: '140', value: '665', label: '동화동' },
  { gu: '140', value: '670', label: '황학동' },
  { gu: '140', value: '680', label: '중림동' },
  { gu: '170', value: '510', label: '후암동' },
  { gu: '170', value: '520', label: '용산2가동' },
  { gu: '170', value: '530', label: '남영동' },
  { gu: '170', value: '555', label: '청파동' },
  { gu: '170', value: '560', label: '원효로제1동' },
  { gu: '170', value: '570', label: '원효로제2동' },
  { gu: '170', value: '580', label: '효창동' },
  { gu: '170', value: '590', label: '용문동' },
  { gu: '170', value: '625', label: '한강로동' },
  { gu: '170', value: '630', label: '이촌제1동' },
  { gu: '170', value: '640', label: '이촌제2동' },
  { gu: '170', value: '650', label: '이태원제1동' },
  { gu: '170', value: '660', label: '이태원제2동' },
  { gu: '170', value: '685', label: '한남동' },
  { gu: '170', value: '690', label: '서빙고동' },
  { gu: '170', value: '700', label: '보광동' },
  { gu: '200', value: '520', label: '왕십리제2동' },
  { gu: '200', value: '535', label: '왕십리도선동' },
  { gu: '200', value: '540', label: '마장동' },
  { gu: '200', value: '550', label: '사근동' },
  { gu: '200', value: '560', label: '행당제1동' },
  { gu: '200', value: '570', label: '행당제2동' },
  { gu: '200', value: '580', label: '응봉동' },
  { gu: '200', value: '590', label: '금호1가동' },
  { gu: '200', value: '615', label: '금호2.3가동' },
  { gu: '200', value: '620', label: '금호4가동' },
  { gu: '200', value: '645', label: '옥수동' },
  { gu: '200', value: '650', label: '성수1가제1동' },
  { gu: '200', value: '660', label: '성수1가제2동' },
  { gu: '200', value: '670', label: '성수2가제1동' },
  { gu: '200', value: '690', label: '성수2가제3동' },
  { gu: '200', value: '720', label: '송정동' },
  { gu: '200', value: '790', label: '용답동' },
  { gu: '215', value: '710', label: '화양동' },
  { gu: '215', value: '730', label: '군자동' },
  { gu: '215', value: '740', label: '중곡제1동' },
  { gu: '215', value: '750', label: '중곡제2동' },
  { gu: '215', value: '760', label: '중곡제3동' },
  { gu: '215', value: '770', label: '중곡제4동' },
  { gu: '215', value: '780', label: '능동' },
  { gu: '215', value: '810', label: '광장동' },
  { gu: '215', value: '820', label: '자양제1동' },
  { gu: '215', value: '830', label: '자양제2동' },
  { gu: '215', value: '840', label: '자양제3동' },
  { gu: '215', value: '847', label: '자양제4동' },
  { gu: '215', value: '850', label: '구의제1동' },
  { gu: '215', value: '860', label: '구의제2동' },
  { gu: '215', value: '870', label: '구의제3동' },
  { gu: '230', value: '536', label: '용신동' },
  { gu: '230', value: '545', label: '제기동' },
  { gu: '230', value: '560', label: '전농제1동' },
  { gu: '230', value: '570', label: '전농제2동' },
  { gu: '230', value: '600', label: '답십리제1동' },
  { gu: '230', value: '610', label: '답십리제2동' },
  { gu: '230', value: '650', label: '장안제1동' },
  { gu: '230', value: '660', label: '장안제2동' },
  { gu: '230', value: '705', label: '청량리동' },
  { gu: '230', value: '710', label: '회기동' },
  { gu: '230', value: '720', label: '휘경제1동' },
  { gu: '230', value: '730', label: '휘경제2동' },
  { gu: '230', value: '740', label: '이문제1동' },
  { gu: '230', value: '750', label: '이문제2동' },
  { gu: '260', value: '520', label: '면목제2동' },
  { gu: '260', value: '540', label: '면목제4동' },
  { gu: '260', value: '550', label: '면목제5동' },
  { gu: '260', value: '565', label: '면목본동' },
  { gu: '260', value: '570', label: '면목제7동' },
  { gu: '260', value: '575', label: '면목제3.8동' },
  { gu: '260', value: '580', label: '상봉제1동' },
  { gu: '260', value: '590', label: '상봉제2동' },
  { gu: '260', value: '600', label: '중화제1동' },
  { gu: '260', value: '610', label: '중화제2동' },
  { gu: '260', value: '620', label: '묵제1동' },
  { gu: '260', value: '630', label: '묵제2동' },
  { gu: '260', value: '655', label: '망우본동' },
  { gu: '260', value: '660', label: '망우제3동' },
  { gu: '260', value: '680', label: '신내1동' },
  { gu: '260', value: '690', label: '신내2동' },
  { gu: '290', value: '525', label: '성북동' },
  { gu: '290', value: '555', label: '삼선동' },
  { gu: '290', value: '575', label: '동선동' },
  { gu: '290', value: '580', label: '돈암제1동' },
  { gu: '290', value: '590', label: '돈암제2동' },
  { gu: '290', value: '600', label: '안암동' },
  { gu: '290', value: '610', label: '보문동' },
  { gu: '290', value: '620', label: '정릉제1동' },
  { gu: '290', value: '630', label: '정릉제2동' },
  { gu: '290', value: '640', label: '정릉제3동' },
  { gu: '290', value: '650', label: '정릉제4동' },
  { gu: '290', value: '660', label: '길음제1동' },
  { gu: '290', value: '685', label: '길음제2동' },
  { gu: '290', value: '705', label: '종암동' },
  { gu: '290', value: '715', label: '월곡제1동' },
  { gu: '290', value: '725', label: '월곡제2동' },
  { gu: '290', value: '760', label: '장위제1동' },
  { gu: '290', value: '770', label: '장위제2동' },
  { gu: '290', value: '780', label: '장위제3동' },
  { gu: '290', value: '810', label: '석관동' },
  { gu: '305', value: '534', label: '삼양동' },
  { gu: '305', value: '535', label: '미아동' },
  { gu: '305', value: '545', label: '송중동' },
  { gu: '305', value: '555', label: '송천동' },
  { gu: '305', value: '575', label: '삼각산동' },
  { gu: '305', value: '595', label: '번1동' },
  { gu: '305', value: '603', label: '번2동' },
  { gu: '305', value: '608', label: '번3동' },
  { gu: '305', value: '615', label: '수유1동' },
  { gu: '305', value: '625', label: '수유2동' },
  { gu: '305', value: '635', label: '수유3동' },
  { gu: '305', value: '645', label: '우이동' },
  { gu: '305', value: '660', label: '인수동' },
  { gu: '320', value: '511', label: '창제1동' },
  { gu: '320', value: '512', label: '창제2동' },
  { gu: '320', value: '513', label: '창제3동' },
  { gu: '320', value: '514', label: '창제4동' },
  { gu: '320', value: '515', label: '창제5동' },
  { gu: '320', value: '521', label: '도봉제1동' },
  { gu: '320', value: '522', label: '도봉제2동' },
  { gu: '320', value: '660', label: '쌍문제1동' },
  { gu: '320', value: '670', label: '쌍문제2동' },
  { gu: '320', value: '680', label: '쌍문제3동' },
  { gu: '320', value: '681', label: '쌍문제4동' },
  { gu: '320', value: '690', label: '방학제1동' },
  { gu: '320', value: '700', label: '방학제2동' },
  { gu: '320', value: '710', label: '방학제3동' },
  { gu: '350', value: '560', label: '월계1동' },
  { gu: '350', value: '570', label: '월계2동' },
  { gu: '350', value: '580', label: '월계3동' },
  { gu: '350', value: '595', label: '공릉1동' },
  { gu: '350', value: '600', label: '공릉2동' },
  { gu: '350', value: '611', label: '하계1동' },
  { gu: '350', value: '612', label: '하계2동' },
  { gu: '350', value: '619', label: '중계본동' },
  { gu: '350', value: '621', label: '중계1동' },
  { gu: '350', value: '624', label: '중계4동' },
  { gu: '350', value: '625', label: '중계2.3동' },
  { gu: '350', value: '630', label: '상계1동' },
  { gu: '350', value: '640', label: '상계2동' },
  { gu: '350', value: '665', label: '상계3.4동' },
  { gu: '350', value: '670', label: '상계5동' },
  { gu: '350', value: '695', label: '상계6.7동' },
  { gu: '350', value: '700', label: '상계8동' },
  { gu: '350', value: '710', label: '상계9동' },
  { gu: '350', value: '720', label: '상계10동' },
  { gu: '380', value: '510', label: '녹번동' },
  { gu: '380', value: '520', label: '불광제1동' },
  { gu: '380', value: '530', label: '불광제2동' },
  { gu: '380', value: '551', label: '갈현제1동' },
  { gu: '380', value: '552', label: '갈현제2동' },
  { gu: '380', value: '560', label: '구산동' },
  { gu: '380', value: '570', label: '대조동' },
  { gu: '380', value: '580', label: '응암제1동' },
  { gu: '380', value: '590', label: '응암제2동' },
  { gu: '380', value: '600', label: '응암제3동' },
  { gu: '380', value: '625', label: '역촌동' },
  { gu: '380', value: '631', label: '신사제1동' },
  { gu: '380', value: '632', label: '신사제2동' },
  { gu: '380', value: '640', label: '증산동' },
  { gu: '380', value: '650', label: '수색동' },
  { gu: '380', value: '690', label: '진관동' },
  { gu: '410', value: '520', label: '천연동' },
  { gu: '410', value: '555', label: '북아현동' },
  { gu: '410', value: '565', label: '충현동' },
  { gu: '410', value: '585', label: '신촌동' },
  { gu: '410', value: '615', label: '연희동' },
  { gu: '410', value: '620', label: '홍제제1동' },
  { gu: '410', value: '640', label: '홍제제3동' },
  { gu: '410', value: '655', label: '홍제제2동' },
  { gu: '410', value: '660', label: '홍은제1동' },
  { gu: '410', value: '685', label: '홍은제2동' },
  { gu: '410', value: '690', label: '남가좌제1동' },
  { gu: '410', value: '700', label: '남가좌제2동' },
  { gu: '410', value: '710', label: '북가좌제1동' },
  { gu: '410', value: '720', label: '북가좌제2동' },
  { gu: '440', value: '555', label: '아현동' },
  { gu: '440', value: '565', label: '공덕동' },
  { gu: '440', value: '585', label: '도화동' },
  { gu: '440', value: '590', label: '용강동' },
  { gu: '440', value: '600', label: '대흥동' },
  { gu: '440', value: '610', label: '염리동' },
  { gu: '440', value: '630', label: '신수동' },
  { gu: '440', value: '655', label: '서강동' },
  { gu: '440', value: '660', label: '서교동' },
  { gu: '440', value: '680', label: '합정동' },
  { gu: '440', value: '690', label: '망원제1동' },
  { gu: '440', value: '700', label: '망원제2동' },
  { gu: '440', value: '710', label: '연남동' },
  { gu: '440', value: '720', label: '성산제1동' },
  { gu: '440', value: '730', label: '성산제2동' },
  { gu: '440', value: '740', label: '상암동' },
  { gu: '470', value: '510', label: '목1동' },
  { gu: '470', value: '520', label: '목2동' },
  { gu: '470', value: '530', label: '목3동' },
  { gu: '470', value: '540', label: '목4동' },
  { gu: '470', value: '550', label: '목5동' },
  { gu: '470', value: '560', label: '신월1동' },
  { gu: '470', value: '570', label: '신월2동' },
  { gu: '470', value: '580', label: '신월3동' },
  { gu: '470', value: '590', label: '신월4동' },
  { gu: '470', value: '600', label: '신월5동' },
  { gu: '470', value: '610', label: '신월6동' },
  { gu: '470', value: '611', label: '신월7동' },
  { gu: '470', value: '620', label: '신정1동' },
  { gu: '470', value: '630', label: '신정2동' },
  { gu: '470', value: '640', label: '신정3동' },
  { gu: '470', value: '650', label: '신정4동' },
  { gu: '470', value: '670', label: '신정6동' },
  { gu: '470', value: '680', label: '신정7동' },
  { gu: '500', value: '510', label: '염창동' },
  { gu: '500', value: '520', label: '등촌제1동' },
  { gu: '500', value: '530', label: '등촌제2동' },
  { gu: '500', value: '535', label: '등촌제3동' },
  { gu: '500', value: '540', label: '화곡제1동' },
  { gu: '500', value: '550', label: '화곡제2동' },
  { gu: '500', value: '560', label: '화곡제3동' },
  { gu: '500', value: '570', label: '화곡제4동' },
  { gu: '500', value: '590', label: '화곡본동' },
  { gu: '500', value: '591', label: '화곡제6동' },
  { gu: '500', value: '593', label: '화곡제8동' },
  { gu: '500', value: '603', label: '가양제1동' },
  { gu: '500', value: '604', label: '가양제2동' },
  { gu: '500', value: '605', label: '가양제3동' },
  { gu: '500', value: '611', label: '발산제1동' },
  { gu: '500', value: '615', label: '우장산동' },
  { gu: '500', value: '620', label: '공항동' },
  { gu: '500', value: '630', label: '방화제1동' },
  { gu: '500', value: '640', label: '방화제2동' },
  { gu: '500', value: '641', label: '방화제3동' },
  { gu: '530', value: '510', label: '신도림동' },
  { gu: '530', value: '520', label: '구로제1동' },
  { gu: '530', value: '530', label: '구로제2동' },
  { gu: '530', value: '540', label: '구로제3동' },
  { gu: '530', value: '550', label: '구로제4동' },
  { gu: '530', value: '560', label: '구로제5동' },
  { gu: '530', value: '595', label: '가리봉동' },
  { gu: '530', value: '720', label: '고척제1동' },
  { gu: '530', value: '730', label: '고척제2동' },
  { gu: '530', value: '740', label: '개봉제1동' },
  { gu: '530', value: '750', label: '개봉제2동' },
  { gu: '530', value: '760', label: '개봉제3동' },
  { gu: '530', value: '770', label: '오류제1동' },
  { gu: '530', value: '780', label: '오류제2동' },
  { gu: '530', value: '790', label: '수궁동' },
  { gu: '545', value: '510', label: '가산동' },
  { gu: '545', value: '610', label: '독산제1동' },
  { gu: '545', value: '620', label: '독산제2동' },
  { gu: '545', value: '630', label: '독산제3동' },
  { gu: '545', value: '640', label: '독산제4동' },
  { gu: '545', value: '670', label: '시흥제1동' },
  { gu: '545', value: '680', label: '시흥제2동' },
  { gu: '545', value: '690', label: '시흥제3동' },
  { gu: '545', value: '700', label: '시흥제4동' },
  { gu: '545', value: '710', label: '시흥제5동' },
  { gu: '560', value: '515', label: '영등포본동' },
  { gu: '560', value: '535', label: '영등포동' },
  { gu: '560', value: '540', label: '여의동' },
  { gu: '560', value: '550', label: '당산제1동' },
  { gu: '560', value: '560', label: '당산제2동' },
  { gu: '560', value: '585', label: '도림동' },
  { gu: '560', value: '605', label: '문래동' },
  { gu: '560', value: '610', label: '양평제1동' },
  { gu: '560', value: '620', label: '양평제2동' },
  { gu: '560', value: '630', label: '신길제1동' },
  { gu: '560', value: '650', label: '신길제3동' },
  { gu: '560', value: '660', label: '신길제4동' },
  { gu: '560', value: '670', label: '신길제5동' },
  { gu: '560', value: '680', label: '신길제6동' },
  { gu: '560', value: '690', label: '신길제7동' },
  { gu: '560', value: '700', label: '대림제1동' },
  { gu: '560', value: '710', label: '대림제2동' },
  { gu: '560', value: '720', label: '대림제3동' },
  { gu: '590', value: '510', label: '노량진제1동' },
  { gu: '590', value: '520', label: '노량진제2동' },
  { gu: '590', value: '530', label: '상도제1동' },
  { gu: '590', value: '540', label: '상도제2동' },
  { gu: '590', value: '550', label: '상도제3동' },
  { gu: '590', value: '560', label: '상도제4동' },
  { gu: '590', value: '605', label: '흑석동' },
  { gu: '590', value: '620', label: '사당제1동' },
  { gu: '590', value: '630', label: '사당제2동' },
  { gu: '590', value: '640', label: '사당제3동' },
  { gu: '590', value: '650', label: '사당제4동' },
  { gu: '590', value: '651', label: '사당제5동' },
  { gu: '590', value: '660', label: '대방동' },
  { gu: '590', value: '670', label: '신대방제1동' },
  { gu: '590', value: '680', label: '신대방제2동' },
  { gu: '620', value: '525', label: '보라매동' },
  { gu: '620', value: '545', label: '청림동' },
  { gu: '620', value: '565', label: '성현동' },
  { gu: '620', value: '575', label: '행운동' },
  { gu: '620', value: '585', label: '낙성대동' },
  { gu: '620', value: '595', label: '청룡동' },
  { gu: '620', value: '605', label: '은천동' },
  { gu: '620', value: '615', label: '중앙동' },
  { gu: '620', value: '625', label: '인헌동' },
  { gu: '620', value: '630', label: '남현동' },
  { gu: '620', value: '645', label: '서원동' },
  { gu: '620', value: '655', label: '신원동' },
  { gu: '620', value: '665', label: '서림동' },
  { gu: '620', value: '685', label: '신사동' },
  { gu: '620', value: '695', label: '신림동' },
  { gu: '620', value: '715', label: '난향동' },
  { gu: '620', value: '725', label: '조원동' },
  { gu: '620', value: '735', label: '대학동' },
  { gu: '620', value: '745', label: '삼성동' },
  { gu: '620', value: '765', label: '미성동' },
  { gu: '620', value: '775', label: '난곡동' },
  { gu: '650', value: '510', label: '서초1동' },
  { gu: '650', value: '520', label: '서초2동' },
  { gu: '650', value: '530', label: '서초3동' },
  { gu: '650', value: '531', label: '서초4동' },
  { gu: '650', value: '540', label: '잠원동' },
  { gu: '650', value: '550', label: '반포본동' },
  { gu: '650', value: '560', label: '반포1동' },
  { gu: '650', value: '570', label: '반포2동' },
  { gu: '650', value: '580', label: '반포3동' },
  { gu: '650', value: '581', label: '반포4동' },
  { gu: '650', value: '590', label: '방배본동' },
  { gu: '650', value: '600', label: '방배1동' },
  { gu: '650', value: '610', label: '방배2동' },
  { gu: '650', value: '620', label: '방배3동' },
  { gu: '650', value: '621', label: '방배4동' },
  { gu: '650', value: '651', label: '양재1동' },
  { gu: '650', value: '652', label: '양재2동' },
  { gu: '650', value: '660', label: '내곡동' },
  { gu: '680', value: '510', label: '신사동' },
  { gu: '680', value: '521', label: '논현1동' },
  { gu: '680', value: '531', label: '논현2동' },
  { gu: '680', value: '545', label: '압구정동' },
  { gu: '680', value: '565', label: '청담동' },
  { gu: '680', value: '580', label: '삼성1동' },
  { gu: '680', value: '590', label: '삼성2동' },
  { gu: '680', value: '600', label: '대치1동' },
  { gu: '680', value: '610', label: '대치2동' },
  { gu: '680', value: '630', label: '대치4동' },
  { gu: '680', value: '640', label: '역삼1동' },
  { gu: '680', value: '650', label: '역삼2동' },
  { gu: '680', value: '655', label: '도곡1동' },
  { gu: '680', value: '656', label: '도곡2동' },
  { gu: '680', value: '660', label: '개포1동' },
  { gu: '680', value: '670', label: '개포2동' },
  { gu: '680', value: '690', label: '개포4동' },
  { gu: '680', value: '700', label: '세곡동' },
  { gu: '680', value: '720', label: '일원본동' },
  { gu: '680', value: '730', label: '일원1동' },
  { gu: '680', value: '740', label: '일원2동' },
  { gu: '680', value: '750', label: '수서동' },
  { gu: '710', value: '510', label: '풍납1동' },
  { gu: '710', value: '520', label: '풍납2동' },
  { gu: '710', value: '531', label: '거여1동' },
  { gu: '710', value: '532', label: '거여2동' },
  { gu: '710', value: '540', label: '마천1동' },
  { gu: '710', value: '550', label: '마천2동' },
  { gu: '710', value: '561', label: '방이1동' },
  { gu: '710', value: '562', label: '방이2동' },
  { gu: '710', value: '566', label: '오륜동' },
  { gu: '710', value: '570', label: '오금동' },
  { gu: '710', value: '580', label: '송파1동' },
  { gu: '710', value: '590', label: '송파2동' },
  { gu: '710', value: '600', label: '석촌동' },
  { gu: '710', value: '610', label: '삼전동' },
  { gu: '710', value: '620', label: '가락본동' },
  { gu: '710', value: '631', label: '가락1동' },
  { gu: '710', value: '632', label: '가락2동' },
  { gu: '710', value: '641', label: '문정1동' },
  { gu: '710', value: '642', label: '문정2동' },
  { gu: '710', value: '646', label: '장지동' },
  { gu: '710', value: '647', label: '위례동' },
  { gu: '710', value: '650', label: '잠실본동' },
  { gu: '710', value: '670', label: '잠실2동' },
  { gu: '710', value: '680', label: '잠실3동' },
  { gu: '710', value: '690', label: '잠실4동' },
  { gu: '710', value: '710', label: '잠실6동' },
  { gu: '710', value: '720', label: '잠실7동' },
  { gu: '740', value: '515', label: '강일동' },
  { gu: '740', value: '520', label: '상일동' },
  { gu: '740', value: '530', label: '명일제1동' },
  { gu: '740', value: '540', label: '명일제2동' },
  { gu: '740', value: '550', label: '고덕제1동' },
  { gu: '740', value: '560', label: '고덕제2동' },
  { gu: '740', value: '570', label: '암사제1동' },
  { gu: '740', value: '580', label: '암사제2동' },
  { gu: '740', value: '590', label: '암사제3동' },
  { gu: '740', value: '600', label: '천호제1동' },
  { gu: '740', value: '610', label: '천호제2동' },
  { gu: '740', value: '620', label: '천호제3동' },
  { gu: '740', value: '640', label: '성내제1동' },
  { gu: '740', value: '650', label: '성내제2동' },
  { gu: '740', value: '660', label: '성내제3동' },
  { gu: '740', value: '685', label: '길동' },
  { gu: '740', value: '690', label: '둔촌제1동' },
  { gu: '740', value: '700', label: '둔촌제2동' },
];