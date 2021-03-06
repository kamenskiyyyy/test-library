import { MigrationInterface, QueryRunner } from 'typeorm';

export class BooksDB1627556545930 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE "books" (
    "id"          serial  constraint "PK_f3f2f25a099d24e12545b70b022"  primary key,
    "title"       varchar                                         not null,
    "description" varchar default 'Неизвестно'::character varying not null,
    "price"       integer                                         not null,
    "author"      varchar default 'Неизвестно'::character varying not null,
    "year"        integer,
    "isReader"  boolean default false                           not null
)`);
    await queryRunner.query(
      `INSERT INTO "books" (id, title, description, price, author, year, "isReader") VALUES (1, 'Мальчик в полосатой пижаме', 'Не так-то просто рассказать в двух словах об этой удивительной книге. Обычно аннотация дает читателю понять, о чем пойдет речь, но в данном случае мы опасаемся, что любые предварительные выводы или подсказки только помешают ему. Нам представляется очень важным, чтобы вы начали читать, не ведая, что вас ждет. Скажем лишь, что вас ждет необычное и завораживающее путешествие вместе с девятилетним мальчиком по имени Бруно. Вот только сразу предупреждаем, что книга эта никак не предназначена для детей девятилетнего возраста, напротив, это очень взрослая книга, обращенная к людям, которые знают, что такое колючая проволока. Именно колючая проволока вырастет на вашем с Бруно пути. Такого рода ограждения достаточно распространены в нашем мире. И нам остается только надеяться, что вы лично в реальной жизни не столкнетесь ни с чем подобным. Книга же наверняка захватит вас и вряд ли скоро отпустит.', 371, 'Бойн Джон', 2016, false)`,
    );
    await queryRunner.query(
      `INSERT INTO "books" (id, title, description, price, author, year, "isReader") VALUES (2, 'Унесенные ветром', 'Роман Маргарет Митчелл вышел в свет в 1936 году и имел феноменальный успех у читателей. Только в первые годы его тираж превысил три миллиона, и «Унесенные ветром» были признаны «книгой века». В 1939 году на экраны вышел одноименный фильм (с участием Вивьен Ли и Кларком Гейблом), который завоевал восемь премий «Оскар» и стал одной из самых кассовых лент в истории кинематографа. Несмотря на полярные оценки литературных критиков, роман удостоился престижной Пулитцеровской премии, его сравнивали с «Войной и миром» Льва Толстого, а Маргарет Митчелл ставили в один ряд с великими классиками мировой литературы. Книга выдержала более 70 изданий только в Соединенных Штатах, была переведена на десятки языков и по сей день пользуется неизменной популярностью и любовью у читателей во всем мире.', 583, 'Митчелл Маргарет', 2021, false)`,
    );
    await queryRunner.query(
      `INSERT INTO "books" (id, title, description, price, author, year, "isReader") VALUES (3, 'До встречи с тобой', 'Лу Кларк знает, сколько шагов от автобусной остановки до ее дома. Она знает, что ей очень нравится работа в кафе и что, скорее всего, она не любит своего бойфренда Патрика. Но Лу не знает, что вот-вот потеряет свою работу и что в ближайшем будущем ей понадобятся все силы, чтобы преодолеть свалившиеся на нее проблемы. Уилл Трейнор знает, что сбивший его мотоциклист отнял у него желание жить. И он точно знает, что надо сделать, чтобы положить конец всему этому. Но он не знает, что Лу скоро ворвется в его мир буйством красок. И они оба не знают, что навсегда изменят жизнь друг друга. Уже в первые месяцы после выхода в свет романа Джоджо Мойес «До встречи с тобой» было продано свыше полумиллиона экземпляров. Книга вошла в список бестселлеров «Нью-Йорк таймс», переведена на 31 язык. Права на ее экранизацию купила киностудия «Метро-Голдвин-Майер». Впервые на русском языке! ', 366, 'Мойес Джоджо', 2021, false)`,
    );
    await queryRunner.query(
      `INSERT INTO "books" (id, title, description, price, author, year, "isReader") VALUES (4, 'Не навреди. Истории о жизни, смерти и нейрохирургии', 'Работу нейрохирурга никак нельзя назвать скучной. Она приносит огромное личное удовлетворение, однако за это приходится платить. Одна ошибка может стоить кому-то здоровья или даже жизни. Врач из непогрешимого героя, чуть ли не сверхчеловека, вмиг может превратиться в преступника. О чем на самом деле думает нейрохирург, оставаясь наедине с самим собой? Чем он утешает себя, если оказывается не в силах помочь пациенту? Каково это – признать свою вину, когда случается непоправимое? Генри Марш в своей предельно откровенной книге «Не навреди» вместе с читателями размышляет на эти и многие другие темы, связанные с работой нейрохирурга. На личном опыте он убедился, что удачно проведенные операции не стирают из памяти фатальные провалы и ошибки. И то, и другое – часть работы. И с тем, и с другим настоящий врач должен уметь жить.', 527, 'Марш Генри', 2016, false)`,
    );
    await queryRunner.query(
      `INSERT INTO "books" (id, title, description, price, author, year, "isReader") VALUES (5, 'Приключения Шерлока Холмса. Человек с рассечённой губой', 'Шерлок Холмс и доктор Ватсон — каноничная литературная пара, созданная сэром Артуром Конан Дойлом. Она продолжает волновать умы многих поколений читателей, а художников и режиссёров вдохновляет на создание новых произведений.Одним из самых увлекательных рассказов о приключениях известного сыщика считается «Человек с рассечённой губой». Повествование, начинаясь у уютного камина, проведёт вас по опасным районам и сумрачным притонам портового Лондона, по зелёным английским предместьям и, благодаря блистательной дедукции Шерлока Холмса, закончится неожиданнейшей развязкой в полицейском отделении Сити.Иллюстрации для этого издания создал петербургский художник Антон Ломаев. В этой книге, как в небольшом выпуклом зеркале, вы сможете рассмотреть весь мир викторианского Лондона конца XIX века, весь мир приключений Шерлока Холмса.', 1250, 'Артур Конан Дойль', 2021, false)`,
    );
    await queryRunner.query(
      `INSERT INTO "books" (id, title, description, price, author, year, "isReader") VALUES (7, 'Предел', 'Неизвестно', 658, 'Лукьяненко Сергей Васильевич', null, false)`,
    );
    await queryRunner.query(
      `INSERT INTO "books" (id, title, description, price, author, year, "isReader") VALUES (8, 'Просто Маса', 'Это роман о приключениях Масахиро Сибаты, помощника великого сыщика Эраста Фандорина. После многолетнего отсутствия Маса возвращается на родину, в Японию, где его ждут разнообразные неприятности и приятности.', 490, 'Борис Акунин', 2021, false)`,
    );
    await queryRunner.query(
      `INSERT INTO "books" (id, title, description, price, author, year, "isReader") VALUES (9, 'Подсознание может всё!', 'Книга, которая изменит вашу жизнь! Самое известное исследование о подсознании от известного писателя и тренера личностного роста Джона Кехо! В подсознании каждого человека скрываются огромные резервы. И когда логика оказывается бессильной, именно подсознание поможет вам решать самые сложные повседневные проблемы. Джон Кехо три года провёл в лесах, вдали от людей, чтобы провести исследования работы человеческого мозга. Результатом стала эта программа, которая поможет вам активизировать безграничные ресурсы собственного головного мозга, чтобы изменить свою жизнь к лучшему раз и навсегда. Прослушав аудиокнигу, вы узнаете: – как формулировать и визуализировать свои цели; – как подсознание и интуиция могут помочь в достижении счастья; – как укрепить самооценку и развить творческие навыки; – как быть ощущать себя счастливым, независимо от обстоятельств.', 399, 'Джон Кехо', 2016, false)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE books`);
  }
}
