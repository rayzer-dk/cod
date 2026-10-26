const sentence = (da, ru, note, type = 'build', daVariants = [], ruVariants = []) =>
  ({ da, ru, note, type, daAnswers: [da, ...daVariants], ruAnswers: [ru, ...ruVariants] });
const gap = (da, ru, note, text, answer, wrong) => ({
  ...sentence(da, ru, note, 'gap'),
  gap: { text, answers: [answer], options: [answer, ...wrong] }
});
const lesson = (id, level, title, subtitle, rule, rows, kind = 'grammar', color = 'violet') => ({
  id, level, title, subtitle, rule, kind, color, icon: kind === 'grammar' ? 'layers' : 'chat',
  items: rows.map((row, i) => ({ ...row, id: `${id}-${i}`, lessonId: id }))
});

export const grammarLessons = [
  lesson('g-main-order', 'A1', 'Глагол на втором месте', 'Подлежащее, время и инверсия',
    'В обычном повествовательном главном предложении личная форма глагола занимает вторую позицию. Первая позиция — целое смысловое звено, а не одно слово: I dag | arbejder | jeg. В вопросе без вопросительного слова глагол идёт первым.', [
    gap('I dag arbejder jeg hjemme.', 'Сегодня я работаю дома.', 'I dag уже заняло первую позицию: дальше arbejder, затем jeg. I dag jeg arbejder нарушает обычный порядок главного предложения.', 'I dag ___ hjemme.', 'arbejder jeg', ['jeg arbejder', 'jeg arbejde', 'arbejde jeg']),
    gap('Om aftenen læser vi dansk.', 'По вечерам мы читаем по-датски.', 'Om aftenen — одно обстоятельство из двух слов. После него ставим læser vi; число слов перед глаголом не определяет позицию.', 'Om aftenen ___ dansk.', 'læser vi', ['vi læser', 'vi læse', 'læse vi']),
    sentence('Jeg drikker kaffe om morgenen.', 'Я пью кофе по утрам.', 'Начинаем с jeg, поэтому drikker идёт сразу после подлежащего. Om morgenen можно оставить в конце.', 'build', ['Om morgenen drikker jeg kaffe.']),
    sentence('Her bor min søster.', 'Здесь живёт моя сестра.', 'Her вынесено вперёд, поэтому bor предшествует min søster. Her min søster bor — не стандартный порядок такого главного предложения.'),
    sentence('Arbejder du i dag?', 'Ты сегодня работаешь?', 'В вопросе «да или нет» личная форма arbejder стоит перед du. Du arbejder i dag? возможно как переспрос, но здесь тренируем нейтральный вопрос.', 'choice'),
    sentence('I morgen tager vi toget.', 'Завтра мы поедем на поезде.', 'I morgen занимает первую позицию; tager vi — инверсия. Настоящее время с i morgen естественно обозначает запланированное будущее.', 'type')
  ]),
  lesson('g-nouns', 'A1', 'En, et и определённость', 'Род, окончания и знакомые предметы',
    'Запоминай существительное вместе с родом: en bil, et hus. Без прилагательного определённость обычно выражается окончанием: bilen, huset. Во множественном числе формы нужно учить со словом: bøger → bøgerne.', [
    gap('Det er et hus.', 'Это дом.', 'Hus — среднего рода, поэтому et hus. En hus не соответствует роду существительного.', 'Det er ___ hus.', 'et', ['en', 'den', 'de']),
    gap('Bilen er her.', 'Машина здесь.', 'Когда речь об уже известной машине, en bil превращается в bilen. Bilet — неверное окончание: bil относится к общему роду.', '___ er her.', 'Bilen', ['Bilet', 'Bilene', 'Bils']),
    sentence('Jeg har en cykel.', 'У меня есть велосипед.', 'Вводим один предмет впервые: en cykel. Русское «у меня есть» выражаем jeg har.'),
    sentence('Huset ligger ved stationen.', 'Дом находится у вокзала.', 'Et hus → huset. Et station неверно: station — общего рода, определённая форма stationen.'),
    sentence('Bøgerne ligger på bordet.', 'Книги лежат на столе.', 'En bog → bøger → bøgerne; et bord → bordet. Определённость относится к конкретным книгам и столу.', 'choice'),
    sentence('Jeg køber brød og mælk.', 'Я покупаю хлеб и молоко.', 'Brød и mælk здесь обозначают продукты как вещество, поэтому артикль не нужен. Артикль может появиться при значении отдельной порции или разновидности.', 'type')
  ]),
  lesson('g-adjectives', 'A1', 'God, godt, gode', 'Согласование прилагательных',
    'Обычная модель: en stor bil, et stort hus, store biler. Перед определённым существительным с прилагательным: den store bil, det store hus, de store biler. Есть исключения, например lille → små во множественном числе.', [
    gap('Vi har et stort køkken.', 'У нас большая кухня.', 'Køkken — среднего рода: et stort køkken. Stor без -t подходит к en-слову, например en stor stue.', 'Vi har et ___ køkken.', 'stort', ['stor', 'store', 'større end']),
    gap('De nye sko er dyre.', 'Новые туфли дорогие.', 'Sko здесь во множественном числе, поэтому nye и dyre. Nyt относится к единственному числу среднего рода.', 'De ___ sko er dyre.', 'nye', ['nyt', 'ny', 'nyest']),
    sentence('Det gamle hus er stort.', 'Старый дом большой.', 'После det перед существительным — gamle, а после er при описании et hus — stort. Не переносим форму gamle на сказуемое.'),
    sentence('En varm jakke og et varmt tæppe.', 'Тёплая куртка и тёплое одеяло.', 'Jakke — en, tæppe — et: varm / varmt. Род определяется существительным, а не тем, кто пользуется вещью.'),
    sentence('Vi har to små børn.', 'У нас двое маленьких детей.', 'Lille имеет особую форму множественного числа små. Lille børn неверно в этой конструкции.', 'choice'),
    sentence('Min nye telefon er god.', 'Мой новый телефон хороший.', 'После min прилагательное имеет форму nye, а существительное остаётся без определённого окончания. Min nye telefonen смешивает две модели.', 'type')
  ]),
  lesson('g-basic-pronouns', 'A1', 'Jeg, mig, min', 'Кто действует и к кому обращаются',
    'Подлежащее: jeg, du, han, hun, vi, I, de. Объект и форма после предлога: mig, dig, ham, hende, os, jer, dem. Min/mit/mine согласуются с тем, чем владеют: min taske, mit navn, mine nøgler.', [
    gap('Kan du hjælpe mig?', 'Можешь мне помочь?', 'Помощь получает объект mig. Jeg — форма подлежащего и после hjælpe здесь не подходит.', 'Kan du hjælpe ___?', 'mig', ['jeg', 'min', 'mit']),
    gap('Det er mit navn.', 'Это моё имя.', 'Navn — et-слово, поэтому mit. Пол владельца на выбор min/mit не влияет.', 'Det er ___ navn.', 'mit', ['min', 'mine', 'mig']),
    sentence('Hun arbejder sammen med ham.', 'Она работает вместе с ним.', 'После med нужна объектная форма ham. Han работает как подлежащее: Han arbejder.'),
    sentence('Mine nøgler ligger her.', 'Мои ключи лежат здесь.', 'Nøgler — множественное число, поэтому mine. Min nøgler не согласовано по числу.'),
    sentence('Vi besøger jer i morgen.', 'Мы навестим вас завтра.', 'Vi — действующие лица, jer — те, кого навещают. I означает «вы» в роли подлежащего.', 'choice', ['I morgen besøger vi jer.']),
    sentence('Hvor bor din bror?', 'Где живёт твой брат?', 'В прямом вопросе: hvor + bor + din bror. Din соответствует en bror; dit bror неверно.', 'type')
  ]),
  lesson('g-modals', 'A2', 'Kan, skal, vil, må', 'Умение, план, желание и разрешение',
    'После модального глагола употребляется инфинитив без at: kan hjælpe, skal møde. Kan выражает возможность или умение; skal — обязанность или план; vil — желание или намерение; må — разрешение, а в другом контексте необходимость или вывод.', [
    gap('Jeg kan tale dansk.', 'Я умею говорить по-датски.', 'После kan нужен инфинитив tale без at. Taler — личная форма; at tale после kan в этой модели неверно.', 'Jeg kan ___ dansk.', 'tale', ['taler', 'at tale', 'talte']),
    gap('Må jeg låne din pen?', 'Можно одолжить твою ручку?', 'Спрашиваем разрешение: Må jeg...? Skal jeg...? означало бы «Мне следует / нужно...?», а не тот же вопрос.', '___ jeg låne din pen?', 'Må', ['Skal', 'Har', 'Er']),
    sentence('Vi skal mødes klokken ni.', 'Мы должны встретиться в девять.', 'Skal + mødes выражает договорённость или необходимость. Mødes здесь инфинитив; at между словами не ставим.'),
    sentence('Jeg vil gerne lære mere.', 'Я хочу узнать больше.', 'Vil gerne выражает желание; lære — инфинитив. Vil gerne часто звучит мягче, чем прямое «хочу».', 'choice'),
    sentence('Du må ikke parkere her.', 'Здесь нельзя парковаться.', 'Må ikke — запрет. Для отсутствия необходимости обычно говорят behøver ikke: это другое значение.'),
    sentence('Du behøver ikke at komme tidligt.', 'Тебе не обязательно приходить рано.', 'Behøver ikke означает «нет необходимости», а не запрет. В этой модели at допустимо; возможно и behøver ikke komme.', 'type', ['Du behøver ikke komme tidligt.'])
  ]),
  lesson('g-datid', 'A2', 'Прошлое: datid', 'Закончившееся событие и конкретное время',
    'Datid подходит для рассказа о прошлом с отдельным временным ориентиром: i går, sidste år. Регулярные формы различаются: arbejde → arbejdede, købe → købte; неправильные нужно запоминать: være → var, gå → gik.', [
    gap('I går købte vi en cykel.', 'Вчера мы купили велосипед.', 'I går задаёт закончившееся прошлое: købte. После начального обстоятельства — købte vi, а не vi købte.', 'I går ___ en cykel.', 'købte vi', ['vi købte', 'køber vi', 'købt vi']),
    gap('Hun var hjemme i går.', 'Вчера она была дома.', 'Прошедшая форма være — var. Været — причастие и требует вспомогательного глагола, например har været.', 'Hun ___ hjemme i går.', 'var', ['været', 'være', 'er']),
    sentence('Vi arbejdede sammen sidste år.', 'В прошлом году мы работали вместе.', 'Arbejde → arbejdede. Sidste år — отдельный прошлый период: здесь естественно datid.', 'build', ['Sidste år arbejdede vi sammen.']),
    sentence('Han gik til stationen.', 'Он пошёл на станцию.', 'Gå → gik — неправильная форма. Gåede не используется как нормативная прошедшая форма.'),
    sentence('Hvad sagde du?', 'Что ты сказал?', 'Sige → sagde. В прямом вопросе после hvad ставим sagde, затем du.', 'choice', [], ['Что ты сказала?']),
    sentence('Jeg ringede, men ingen svarede.', 'Я позвонил, но никто не ответил.', 'Ringede и svarede описывают последовательность прошлых событий. Ingen — подлежащее второй части, поэтому отдельное ikke не нужно.', 'type', [], ['Я позвонила, но никто не ответил.'])
  ]),
  lesson('g-perfect', 'A2', 'Førnutid: har или er', 'Опыт, результат и движение',
    'Førnutid: har/er + причастие. Har læst описывает опыт или актуальный результат; er kommet — прибытие. Выбор har/er связан с конкретным глаголом и значением: нельзя применять er ко всем глаголам движения. С указанием законченного момента i går обычно выбираем datid.', [
    gap('Jeg har læst brevet.', 'Я прочитал письмо.', 'Læst — причастие после har. Læste — datid и без har образует другую временную конструкцию.', 'Jeg har ___ brevet.', 'læst', ['læste', 'læser', 'læse']),
    gap('Hun er kommet hjem.', 'Она пришла домой.', 'Здесь komme означает прибытие, поэтому er kommet. Har kommet не является стандартным вариантом этой фразы.', 'Hun ___ kommet hjem.', 'er', ['har', 'blev', 'kan']),
    sentence('Har du nogensinde været i Aarhus?', 'Ты когда-нибудь был в Орхусе?', 'Спрашиваем об опыте до настоящего момента: har været. Вопрос начинается со вспомогательного har; været остаётся причастием.', 'choice', [], ['Ты когда-нибудь была в Орхусе?']),
    sentence('Vi har boet her i fem år.', 'Мы живём здесь уже пять лет.', 'В этой фразе førnutid с длительностью описывает проживание, начавшееся раньше и продолжающееся сейчас. Это не обязательно закончившиеся пять лет.'),
    sentence('Toget er allerede kørt.', 'Поезд уже ушёл.', 'Er kørt подчёркивает отправление и его нынешний результат. Для деятельности «я водил машину» используется другая модель: jeg har kørt bil.'),
    sentence('Jeg så filmen i går.', 'Я посмотрел фильм вчера.', 'I går указывает отдельный законченный момент: så, а не нейтральное har set i går в этой учебной модели.', 'type', ['I går så jeg filmen.'], ['Я посмотрела фильм вчера.'])
  ]),
  lesson('g-questions', 'A2', 'Вопрос и отрицание', 'Прямой вопрос, ответ и косвенный вопрос',
    'Прямой вопрос: Hvor bor du? Косвенный: Jeg ved ikke, hvor du bor. В обычном главном предложении ikke стоит после личной формы, а при инверсии — после подлежащего: I dag kan jeg ikke komme.', [
    gap('Hvor arbejder du?', 'Где ты работаешь?', 'В прямом вопросе hvor + arbejder + du. Hvor du arbejder употребляется внутри косвенного вопроса, например jeg ved, hvor du arbejder.', 'Hvor ___?', 'arbejder du', ['du arbejder', 'du arbejde', 'arbejde du']),
    gap('Jeg ved ikke, hvor hun bor.', 'Я не знаю, где она живёт.', 'После hvor внутри косвенного вопроса — hun bor, без вопросительной инверсии. Bor hun было бы порядком отдельного прямого вопроса.', 'Jeg ved ikke, hvor ___.', 'hun bor', ['bor hun', 'bor', 'hun bo']),
    sentence('I dag kan jeg ikke komme.', 'Сегодня я не могу прийти.', 'После I dag ставим kan, затем jeg и ikke. В конце komme — инфинитив после kan.'),
    sentence('Kommer du ikke i morgen?', 'Разве ты не придёшь завтра?', 'Вопрос начинается с kommer; du стоит перед ikke. Такая форма нередко выражает ожидание, что человек придёт.', 'choice'),
    sentence('Jo, jeg kommer i morgen.', 'Нет, я как раз приду завтра.', 'Jo подтверждает положительное содержание в ответ на отрицательный вопрос. Русское «нет» здесь отвергает предположение «не придёшь».', 'type', [], ['Да, я приду завтра.','Я как раз приду завтра.']),
    sentence('Jeg spørger, om mødet er aflyst.', 'Я спрашиваю, отменена ли встреча.', 'Om вводит косвенный вопрос «ли»: mødet er. Om er mødet aflyst неверно для этой конструкции.')
  ]),
  lesson('g-subordinate-order', 'B1', 'Где стоит ikke в придаточном', 'At, fordi, hvis и инверсия снаружи',
    'Базовый письменный порядок придаточного: союз + подлежащее + ikke + личный глагол: fordi jeg ikke kan. Если придаточное стоит первым, в последующей главной части нужна инверсия: Hvis ..., tager jeg ... . В живой речи встречаются и другие модели; здесь тренируем нейтральный стандарт.', [
    gap('Hun siger, at hun ikke har tid.', 'Она говорит, что у неё нет времени.', 'В придаточном at hun ikke har: ikke перед har. At hun har ikke переносит сюда порядок главного предложения.', 'Hun siger, at hun ___ tid.', 'ikke har', ['har ikke', 'ikke have', 'har ingen ikke']),
    gap('Hvis det regner, bliver vi hjemme.', 'Если пойдёт дождь, мы останемся дома.', 'Начальное придаточное занимает первую позицию целого предложения. Затем bliver vi; порядок vi bliver здесь не подходит.', 'Hvis det regner, ___ hjemme.', 'bliver vi', ['vi bliver', 'vi blive', 'blive vi']),
    sentence('Jeg ringer, fordi jeg ikke kan finde adressen.', 'Я звоню, потому что не могу найти адрес.', 'Ikke стоит перед kan внутри fordi-части. Finde остаётся инфинитивом после модального kan.'),
    sentence('Selvom hun er træt, arbejder hun videre.', 'Хотя она устала, она продолжает работать.', 'Selvom вводит уступку. После завершённого придаточного идёт arbejder hun; videre передаёт продолжение.'),
    sentence('Jeg håber, at vi snart kan mødes.', 'Я надеюсь, что мы скоро сможем встретиться.', 'В придаточном наречие snart стоит перед личным kan. Не переставляй vi и kan по модели прямого вопроса.', 'choice'),
    sentence('Når jeg ikke forstår noget, spørger jeg.', 'Когда я чего-то не понимаю, я спрашиваю.', 'Внутри når-части: jeg ikke forstår. В главной после неё: spørger jeg. В одной фразе работают два разных порядка.', 'type')
  ]),
  lesson('g-reflexive', 'B1', 'Sin, sit, sine или hans?', 'Чья вещь и к кому относится местоимение',
    'В базовом стандартном употреблении sin/sit/sine указывают на владельца — подлежащее той же части предложения в третьем лице единственного числа. Форму выбирают по предмету: sin bil, sit hus, sine børn. Hans/hendes могут указывать на другого человека; с de для их собственных вещей обычно используют deres.', [
    gap('Anna tager sin cykel.', 'Анна берёт свой велосипед.', 'Владелец — Anna, подлежащее той же части; cykel — en-слово, поэтому sin. Hendes обозначало бы велосипед другой женщины в базовом стандартном чтении.', 'Anna tager ___ cykel.', 'sin', ['sit', 'sine', 'sig']),
    gap('De besøger deres forældre.', 'Они навещают своих родителей.', 'Для подлежащего de здесь используем deres. Sine в этой стандартной модели относится к подлежащему единственного числа третьего лица.', 'De besøger ___ forældre.', 'deres', ['sine', 'sit', 'sig']),
    sentence('Han passer sine børn.', 'Он присматривает за своими детьми.', 'Дети — его собственные; børn во множественном числе, поэтому sine. Sit не согласуется с множественным числом.'),
    sentence('Hun sælger sit hus.', 'Она продаёт свой дом.', 'Hus — среднего рода: sit. Пол владелицы не требует sin: местоимение согласуется с домом.'),
    sentence('Anna siger, at hendes bror kommer.', 'Анна говорит, что её брат придёт.', 'В at-части подлежащее — hendes bror. Sin bror не может быть подлежащим с таким отсылом к Anna из внешней части.', 'choice'),
    sentence('Han vasker sig og tager sin jakke på.', 'Он умывается и надевает свою куртку.', 'Sig — возвратный объект «себя»; sin + существительное обозначает принадлежность. Sig jakke смешивает две функции.', 'type')
  ]),
  lesson('g-relative', 'B1', 'Som и der', 'Уточняем, о ком или о чём речь',
    'В относительном придаточном som может быть подлежащим или объектом. Der в этой роли используют как подлежащее: en kollega, der arbejder. Объектное som можно опустить: den bog, jeg læser. Вопросительное кто — hvem, а не som.', [
    gap('Det er den bog, som jeg læser.', 'Это та книга, которую я читаю.', 'Внутри придаточного подлежащее — jeg, а som обозначает объект læser. Der в роли объекта здесь не подходит; som можно опустить.', 'Det er den bog, ___ jeg læser.', 'som', ['der', 'hvem', 'hvilken']),
    gap('Vi søger en kollega, der ikke er bange for ansvar.', 'Мы ищем коллегу, который не боится ответственности.', 'Der — подлежащее придаточного, поэтому после него ikke er. Er ikke было бы обычным порядком главного предложения.', 'Vi søger en kollega, der ___ bange for ansvar.', 'ikke er', ['er ikke', 'ikke være', 'er ingen']),
    sentence('Jeg kender en lærer, som taler russisk.', 'Я знаю преподавателя, который говорит по-русски.', 'Som — подлежащее taler, поэтому можно также der. Подлежащее относительного придаточного здесь нельзя просто опустить.', 'build', ['Jeg kender en lærer, der taler russisk.']),
    sentence('Den kollega, jeg talte med, arbejder her.', 'Коллега, с которым я разговаривал, работает здесь.', 'Объектное som опущено, med осталось в конце придаточного. Такое расположение предлога естественно в датском.', 'type', ['Den kollega, som jeg talte med, arbejder her.'], ['Коллега, с которым я разговаривала, работает здесь.']),
    sentence('Jeg ved ikke, hvem der kommer.', 'Я не знаю, кто придёт.', 'В косвенном вопросе hvem der kommer спрашиваем о неизвестном человеке. Это не относительное som, привязанное к существительному.', 'choice'),
    sentence('Det er en opgave, som vi ikke kan løse alene.', 'Это задача, которую мы не можем решить в одиночку.', 'Som — объект, vi — подлежащее, ikke стоит перед kan. Возможен вариант без som, смысл сохраняется.', 'build', ['Det er en opgave, vi ikke kan løse alene.'])
  ]),
  lesson('g-time-purpose', 'B1', 'Da, når, hvis и for at', 'Событие, повторение, условие и цель',
    'Da вводит отдельное прошлое событие или период. Når — повторение либо ожидаемое будущее; hvis — условие. For at + инфинитив выражает цель при общем действующем лице. Чтобы назвать другого исполнителя, удобно использовать så + полноценное придаточное.', [
    gap('Da vi kom hjem i går, var det sent.', 'Когда мы вчера пришли домой, было поздно.', 'Вчерашнее возвращение — отдельное прошлое событие: da. Når здесь не передаёт этот единичный прошлый случай в нейтральном рассказе.', '___ vi kom hjem i går, var det sent.', 'Da', ['Når', 'For at', 'Om']),
    gap('Jeg øver mig for at blive bedre.', 'Я тренируюсь, чтобы стать лучше.', 'Цель с тем же исполнителем jeg: for at + blive. Fordi требует придаточного с подлежащим и объясняет причину, а не эту цель.', 'Jeg øver mig ___ blive bedre.', 'for at', ['fordi', 'hvis', 'da']),
    sentence('Når jeg har fri, går jeg en tur.', 'Когда у меня выходной, я иду гулять.', 'Når описывает повторяющуюся ситуацию. После начального придаточного — går jeg.'),
    sentence('Hvis du har tid, kan vi tale sammen.', 'Если у тебя есть время, мы можем поговорить.', 'Hvis оставляет наличие времени условием. Når du har tid обычно означает «когда у тебя будет время».'),
    sentence('Jeg sender adressen, så du kan finde os.', 'Я отправляю адрес, чтобы ты мог нас найти.', 'Исполнитель второй части — du, поэтому используем полноценное придаточное så du kan. For at du kan не является нужной инфинитивной моделью.', 'choice', [], ['Я отправляю адрес, чтобы ты могла нас найти.']),
    sentence('Når mødet er slut, ringer jeg.', 'Когда встреча закончится, я позвоню.', 'Når подходит для ожидаемого будущего. Датский допускает настоящее er и ringer при таком будущем значении.', 'type')
  ]),
  lesson('g-passive', 'B2', 'Пассив: -s и blive', 'Процедура, действие и готовый результат',
    'S-пассив часто встречается в инструкциях и описании процедур: ansøgningen sendes. Blive + причастие удобно для события: blev sendt. Være + причастие может описывать готовый результат: er lukket. Эти модели могут пересекаться по контексту; это ориентиры, а не абсолютное разделение.', [
    gap('Ansøgningen skal sendes digitalt.', 'Заявление нужно отправить в электронном виде.', 'После skal стоит пассивный инфинитив sendes. Sender — активная личная форма; sendt — причастие, для которого здесь не хватает blive.', 'Ansøgningen skal ___ digitalt.', 'sendes', ['sender', 'sendt', 'sendte']),
    gap('Brevet blev sendt i går.', 'Письмо было отправлено вчера.', 'Blev + sendt образует прошедший пассив события. Sendte — активная форма datid и после blev не подходит.', 'Brevet blev ___ i går.', 'sendt', ['sendte', 'sende', 'sender']),
    sentence('Mødet bliver aflyst, hvis for få tilmelder sig.', 'Встречу отменят, если зарегистрируется слишком мало людей.', 'Bliver aflyst описывает возможное событие. В условии tilmelder sig — зарегистрируются; for få значит «слишком мало».'),
    sentence('Døren er lukket.', 'Дверь закрыта.', 'Er lukket может описывать состояние двери сейчас. Фраза не обязана сообщать, кто и когда её закрыл.', 'choice'),
    sentence('Sagen er blevet behandlet af kommunen.', 'Дело было рассмотрено муниципалитетом.', 'Er blevet behandlet — førnutid пассива с blive; af называет исполнителя. Har blevet не является этой нормативной конструкцией.'),
    sentence('Vi behandler alle ansøgninger fortroligt.', 'Мы рассматриваем все заявления конфиденциально.', 'Активная форма ясно называет ответственного vi. Пассив полезен для процедур, но не нужен, если важно указать исполнителя.', 'type')
  ]),
  lesson('g-conditionals', 'B2', 'Если бы: условие и результат', 'Реальные планы и нереальное прошлое',
    'Реальное условие: hvis vi får tid, gør vi det. Воображаемая ситуация: hvis vi havde tid, ville vi gøre det. Несостоявшееся прошлое: hvis vi havde haft tid, ville vi have gjort det. Datid здесь может выражать нереальность, а не прошлое время.', [
    gap('Hvis vi havde mere tid, ville vi undersøge sagen.', 'Если бы у нас было больше времени, мы бы изучили вопрос.', 'Воображаемая ситуация сейчас: havde + ville undersøge. Ville undersøgt пропускает инфинитив have, если нужен перфект, и не образует эту модель.', 'Hvis vi havde mere tid, ___ sagen.', 'ville vi undersøge', ['vi ville undersøge', 'ville vi undersøgt', 'vil vi undersøgte']),
    gap('Hvis jeg havde vidst det, ville jeg have ringet.', 'Если бы я знал об этом, я бы позвонил.', 'Речь о несостоявшемся прошлом: havde vidst / ville have ringet. Ville ringede смешивает модальный глагол и личную прошедшую форму.', 'Hvis jeg havde vidst det, ville jeg ___.', 'have ringet', ['ringede', 'har ringet', 'havde ringet']),
    sentence('Hvis vi får godkendelsen i dag, starter vi i morgen.', 'Если мы получим одобрение сегодня, начнём завтра.', 'Реально возможный план выражаем настоящим временем. Не нужно механически добавлять ville из-за русского будущего.', 'build', ['Vi starter i morgen, hvis vi får godkendelsen i dag.','I morgen starter vi, hvis vi får godkendelsen i dag.']),
    sentence('Jeg ville vælge en anden løsning, hvis jeg var dig.', 'На твоём месте я бы выбрал другое решение.', 'Hvis jeg var dig — устойчивая воображаемая позиция. Var здесь не означает «раньше я был тобой».', 'choice', [], ['На твоём месте я бы выбрала другое решение.']),
    sentence('Uden din hjælp ville vi ikke være blevet færdige.', 'Без твоей помощи мы бы не закончили.', 'Ville være blevet færdige — нереальный прошлый результат с blive færdig. Færdige согласуется с vi.'),
    sentence('Hvis du skulle få brug for hjælp, kan du ringe.', 'Если тебе вдруг понадобится помощь, можешь позвонить.', 'Skulle в условии смягчает и представляет возможность как случайную. Это не обязательно обязанность «должен».', 'type')
  ]),
  lesson('g-connectors', 'B2', 'Fordi, derfor, alligevel', 'Причина, следствие и уступка',
    'Fordi вводит придаточное: fordi vi ikke har tid. Derfor и alligevel — наречия в главном предложении: derfor har vi... . И og/men сами по себе не занимают первую позицию: men vi fortsætter. Сначала определи тип связи, затем строй порядок слов.', [
    gap('Vi har travlt. Derfor udsætter vi mødet.', 'У нас много дел. Поэтому мы откладываем встречу.', 'Derfor занимает первую позицию главного предложения: udsætter vi. Derfor vi udsætter нарушает обычную V2-модель.', 'Vi har travlt. Derfor ___ mødet.', 'udsætter vi', ['vi udsætter', 'vi udsætte', 'udsætte vi']),
    gap('Vi udsætter mødet, fordi vi ikke er klar.', 'Мы откладываем встречу, потому что мы не готовы.', 'Fordi вводит придаточное: vi ikke er. Vi er ikke — порядок самостоятельного главного предложения.', 'Vi udsætter mødet, fordi vi ___ klar.', 'ikke er', ['er ikke', 'ikke være', 'er ingen']),
    sentence('Det regner, men vi går alligevel.', 'Идёт дождь, но мы всё равно пойдём.', 'Men соединяет части, а alligevel значит «несмотря на это». После men можно начинать с vi: men не вызывает инверсию само по себе.'),
    sentence('Selvom prisen er høj, vælger vi kvaliteten.', 'Хотя цена высокая, мы выбираем качество.', 'Selvom + придаточное выражает уступку. После вынесенного придаточного — vælger vi.'),
    sentence('Vi ændrer processen, så fejlene ikke gentager sig.', 'Мы меняем процесс, чтобы ошибки не повторялись.', 'Så здесь вводит цель с полноценным придаточным. Derfor означало бы следствие и потребовало бы другой структуры.', 'choice'),
    sentence('Til gengæld får vi en mere stabil løsning.', 'Зато мы получаем более стабильное решение.', 'Til gengæld вводит компенсирующий плюс. Всё выражение занимает первую позицию, поэтому får vi.', 'type')
  ]),
  lesson('g-perfect-modals', 'B2', 'Burde have, kunne have, må have', 'Прошлое: упрёк, возможность и вывод',
    'Модальный глагол + have + причастие позволяет оценить прошлое: burde have gjort — следовало сделать; kunne have gjort — мог бы сделать; må have gjort — должно быть, сделал. Отрицание меняет смысл: не смешивай запрет må ikke с логическим выводом.', [
    gap('Vi burde have informeret kunden tidligere.', 'Нам следовало сообщить клиенту раньше.', 'Burde have informeret оценивает прошлое действие. Burde informere обычно касается того, что следует сделать, а не этой упущенной возможности.', 'Vi burde ___ kunden tidligere.', 'have informeret', ['har informeret', 'informerede', 'at informere']),
    gap('Hun må have misforstået beskeden.', 'Должно быть, она неправильно поняла сообщение.', 'Må have + причастие выражает вывод о прошлом. Это не разрешение неправильно понимать сообщение.', 'Hun må ___ beskeden.', 'have misforstået', ['har misforstået', 'misforstod', 'at misforstå']),
    sentence('Det kunne have været værre.', 'Могло быть хуже.', 'Kunne have været описывает возможный, но не осуществившийся худший исход. Kunne var грамматически не подходит.'),
    sentence('Jeg skulle have ringet til dig.', 'Мне следовало тебе позвонить.', 'Skulle have ringet часто выражает невыполненную обязанность или сожаление. Контекст важен: та же форма может передавать и предварительную договорённость.', 'choice'),
    sentence('Hun kan have sendt filen til den forkerte adresse.', 'Возможно, она отправила файл не на тот адрес.', 'Kan have sendt — возможное объяснение прошлого. Må have sendt звучало бы как более уверенный вывод.'),
    sentence('Vi behøvede ikke at have ventet så længe.', 'Нам не нужно было ждать так долго.', 'Behøvede ikke at have ventet оценивает уже состоявшееся ожидание как лишнее. Det var ikke nødvendigt уточняет отсутствие необходимости.', 'type', ['Vi behøvede ikke have ventet så længe.'])
  ]),
  lesson('g-evidence-stance', 'C1', 'Источник, факт и осторожный вывод', 'Точность в аналитической и рабочей речи',
    'Разделяй источник (ifølge rapporten), вывод из данных (det tyder på), установленную информацию (det fremgår af) и предположение (formentlig). Наречия sandsynligvis/formentlig не превращают предположение в доказанный факт. Уровень C1 здесь означает отдельные сложные конструкции, а не полный официальный курс.', [
    gap('Ifølge rapporten er udgifterne steget.', 'Согласно отчёту, расходы выросли.', 'Ifølge rapporten — начальное обстоятельство источника, поэтому er udgifterne. Источник утверждения назван, но автор фразы не объявляет его безусловно доказанным.', 'Ifølge rapporten ___ steget.', 'er udgifterne', ['udgifterne er', 'har udgifterne', 'udgifterne har']),
    gap('Det tyder på, at løsningen ikke er holdbar.', 'Это указывает на то, что решение нежизнеспособно.', 'Tyder på сообщает о признаках, а не окончательном доказательстве. В at-части: løsningen ikke er.', 'Det tyder på, at løsningen ___ holdbar.', 'ikke er', ['er ikke', 'ikke være', 'er ingen']),
    sentence('Det fremgår af referatet, at beslutningen blev udsat.', 'Из протокола следует, что принятие решения отложили.', 'Fremgår af указывает, где информация зафиксирована. Blev udsat — прошедший пассив; решение не «отложило» что-то само.'),
    sentence('Resultaterne kan ikke uden videre generaliseres.', 'Результаты нельзя безоговорочно обобщать.', 'Uden videre — без дополнительных оговорок или проверки. Kan ikke ... generaliseres выражает ограничение вывода, а не утверждает, что любое обобщение невозможно.'),
    sentence('Der er formentlig tale om en midlertidig effekt.', 'Вероятно, речь идёт о временном эффекте.', 'Der er tale om — «речь идёт о». Formentlig маркирует вероятностную оценку; удалив его, мы сделали бы утверждение увереннее.', 'choice'),
    sentence('På det foreliggende grundlag kan vi ikke drage en sikker konklusion.', 'На основании имеющихся данных мы не можем сделать уверенный вывод.', 'Длинное начальное обстоятельство занимает одну позицию: затем kan vi. Drage en konklusion — устойчивое сочетание «сделать вывод».', 'type')
  ]),
  lesson('g-focus', 'C1', 'Что именно подчёркиваем', 'Выделение, инверсия и отрицательный фокус',
    'Для выделения используют Det er ... der/som ... . При выносе объекта или обстоятельства вперёд сохраняется V2: Den løsning anbefaler vi. Ikke før и først меняют фокус: не раньше чем / только. Отрицание не следует переносить механически между частями.', [
    gap('Det er kunden, der træffer beslutningen.', 'Именно клиент принимает решение.', 'Выделяем действующее лицо; der служит подлежащим относительной части. Hvem спрашивает «кто» и в эту утвердительную конструкцию не подходит.', 'Det er kunden, ___ træffer beslutningen.', 'der', ['hvem', 'hvor', 'hvis']),
    gap('Først efter mødet forstod vi problemet.', 'Только после встречи мы поняли проблему.', 'Først efter mødet — единое начальное обстоятельство; далее forstod vi. «Второе место» относится к члену предложения, а не второму написанному слову.', 'Først efter mødet ___ problemet.', 'forstod vi', ['vi forstod', 'vi forstået', 'forstået vi']),
    sentence('Den løsning kan jeg ikke anbefale.', 'Это решение я не могу рекомендовать.', 'Объект den løsning вынесен для контраста. После него kan jeg, затем ikke и инфинитив anbefale.'),
    sentence('Det er ikke prisen, men kvaliteten, der er afgørende.', 'Решающую роль играет качество, а не цена.', 'Не отрицается важность всего обсуждения: противопоставляются два кандидата на решающий фактор. Der относится к выделенному kvaliteten.'),
    sentence('Det var først i går, at vi fik besked.', 'Мы получили сообщение только вчера.', 'Клефт Det var først ... at выделяет время. Først здесь «только», а не порядковое «первый».', 'choice'),
    sentence('Hvad vi mangler, er en klar prioritering.', 'Чего нам не хватает, так это чётких приоритетов.', 'Hvad vi mangler — придаточное в роли подлежащего. Внутри него нет вопросительной инверсии mangler vi.', 'type', [], ['Нам не хватает чётко расставленных приоритетов.'])
  ]),
  lesson('g-advanced-conditions', 'C1', 'Уступки и точные условия', 'Medmindre, forudsat at, uanset om',
    'Medmindre означает «если только не», forudsat at — «при условии, что», uanset om — «независимо от того, ... ли». Skønt/selvom вводят уступку. Эти союзы требуют внимательно отслеживать смысл отрицания и обычный порядок придаточного.', [
    gap('Vi går videre, medmindre der opstår nye problemer.', 'Мы продолжим, если не возникнут новые проблемы.', 'Medmindre уже содержит смысл исключения «если только не». Ekstra ikke перед opstår перевернуло бы условие: продолжим, если проблемы как раз возникнут.', 'Vi går videre, ___ der opstår nye problemer.', 'medmindre', ['fordi', 'så snart', 'for at']),
    gap('Vi kan godkende planen, forudsat at budgettet ikke overskrides.', 'Мы можем одобрить план при условии, что бюджет не будет превышен.', 'Forudsat at задаёт необходимое условие. В придаточном budgettet ikke overskrides, с отрицанием перед личной пассивной формой.', 'Vi kan godkende planen, forudsat at budgettet ___.', 'ikke overskrides', ['overskrides ikke', 'ikke overskride', 'overskredet ikke']),
    sentence('Uanset om vi får støtte, gennemfører vi projektet.', 'Мы осуществим проект независимо от того, получим ли поддержку.', 'Uanset om охватывает оба исхода. После вынесенного придаточного — gennemfører vi; если заменить на hvis, поддержка стала бы условием.'),
    sentence('Skønt forslaget har klare fordele, er der væsentlige risici.', 'Хотя у предложения есть явные преимущества, существуют существенные риски.', 'Skønt здесь союз «хотя», а не оценка «прекрасно». После придаточного главная часть начинается с er der.'),
    sentence('Selv hvis fristen forlænges, bliver opgaven krævende.', 'Даже если срок продлят, задача останется трудной.', 'Selv hvis — гипотетическая уступка: продление не отменяет трудность. Selvom чаще подаёт содержание как принятое обстоятельство, хотя употребление зависит от контекста.', 'choice'),
    sentence('Jo tydeligere ansvaret er, desto lettere bliver samarbejdet.', 'Чем яснее распределена ответственность, тем легче сотрудничать.', 'Парная модель jo + сравнительная форма, desto + сравнительная форма. В первой части ansvaret er, во второй после desto lettere — bliver samarbejdet.', 'type')
  ]),
  lesson('g-professional-nuance', 'C1', 'Грамматика тактичной позиции', 'Оговорки, предложения и точная сила утверждения',
    'Kunne/ville в деловой речи могут смягчать предложение без буквального прошедшего времени. Det er værd at..., der synes at være... и hvad angår... помогают точнее задавать статус мысли. Вежливость не должна стирать смысл: явно называй предложение, ограничение и следующий шаг.', [
    gap('Det kunne være relevant at undersøge alternativerne.', 'Возможно, стоит изучить альтернативы.', 'Kunne være смягчает оценку актуального действия. После relevant at нужен инфинитив undersøge; undersøger — личная форма и здесь не подходит.', 'Det kunne være relevant at ___ alternativerne.', 'undersøge', ['undersøger', 'undersøgte', 'undersøgt']),
    gap('Hvad angår tidsplanen, har vi brug for en afklaring.', 'Что касается графика, нам нужно уточнение.', 'Hvad angår tidsplanen — вводное тематическое звено. После него в главной части har vi, а не vi har.', 'Hvad angår tidsplanen, ___ brug for en afklaring.', 'har vi', ['vi har', 'vi have', 'have vi']),
    sentence('Jeg vil gerne foreslå, at vi afgrænser opgaven tydeligere.', 'Я хотел бы предложить чётче определить границы задачи.', 'Foreslå, at vi... задаёт предложение с исполнителем vi. Vil gerne делает реплику вежливее, сохраняя конкретное действие.', 'build', [], ['Я хотела бы предложить чётче определить границы задачи.']),
    sentence('Det er værd at overveje, om gevinsten står mål med indsatsen.', 'Стоит подумать, соразмерна ли польза затраченным усилиям.', 'Værd at + инфинитив, затем косвенный вопрос om gevinsten står. Stå mål med — соответствовать по величине, оправдывать затраты.'),
    sentence('Der synes at være en uoverensstemmelse mellem tallene.', 'По-видимому, между цифрами есть расхождение.', 'Der synes at være — осторожное указание на наблюдение. Det synes, at... не заменяет эту безличную конструкцию напрямую.', 'choice'),
    sentence('Jeg vil ikke udelukke, at en justering kan blive nødvendig.', 'Я не исключаю, что может понадобиться корректировка.', 'Vil ikke udelukke оставляет возможность открытой. Это слабее, чем «корректировка необходима»: kan blive указывает на потенциальное развитие.', 'type')
  ])
];

export const conversationLessons = [
  lesson('c-everyday', 'A2', 'Живой разговор каждый день', 'Встреча, поддержка и короткие реакции',
    'Короткие реплики зависят от контекста и интонации. Hvad så? — дружеское приветствие; Det går nok успокаивает, но не гарантирует результат. В упражнениях используем обычное письменное написание даже для разговорных фраз.', [
    sentence('Hvad så? Hvordan går det?', 'Ну как ты? Как дела?', 'Hvad så? — неформальное приветствие знакомому, а не буквальный запрос «что тогда». В официальном письме лучше Hej + имя и конкретная цель.', 'choice', [], ['Ну что, как дела?']),
    sentence('Det går nok.', 'Всё как-нибудь обойдётся.', 'Nok здесь выражает успокаивающую уверенность «наверное, всё будет нормально». Это не буквальное «идёт достаточно».', 'type', [], ['Всё будет нормально.','Всё обойдётся.']),
    sentence('Det er fedt!', 'Это здорово!', 'Fedt разговорно означает «круто, здорово». В официальной оценке лучше, например, Det er meget positivt.', 'choice', [], ['Это круто!']),
    sentence('Skal vi tage en kop kaffe?', 'Может, выпьем кофе?', 'Skal vi...? — обычное предложение совместного действия. Это не всегда вопрос о долге «должны ли мы».', 'build', [], ['Давай выпьем кофе?','Выпьем по чашке кофе?']),
    sentence('Det kan du tro!', 'Ещё бы!', 'Усиленное дружелюбное подтверждение, часто в ответ на просьбу или вопрос. Перевод зависит от вопроса: «конечно», «можешь не сомневаться».', 'choice', [], ['Конечно!','Можешь не сомневаться!']),
    sentence('Vi ses på mandag!', 'Увидимся в понедельник!', 'Vi ses — обычное прощание, когда ожидают следующую встречу. Это готовая взаимная форма, а не приказ «увидь нас».', 'build')
  ], 'conversation', 'cyan'),
  lesson('c-boundaries', 'B1', 'Просить, отказывать и уточнять', 'Разговорные слова без грубого тона',
    'Gider du...? среди знакомых может быть обычной просьбой, но тон способен сделать её раздражённой. Det er lige meget иногда звучит безразлично. Для мягкости добавляй конкретику, благодарность и спокойную формулировку.', [
    sentence('Gider du lige lukke døren?', 'Закроешь, пожалуйста, дверь?', 'Gider du...? — разговорная просьба; lige представляет действие как небольшое. Резкая интонация может превратить её в раздражённое требование.', 'choice', [], ['Можешь закрыть дверь?','Закрой, пожалуйста, дверь.']),
    sentence('Jeg gider ikke diskutere det lige nu.', 'Мне сейчас не хочется это обсуждать.', 'Gider ikke обозначает отсутствие желания или сил и звучит довольно прямо. В рабочем разговоре мягче: Kan vi tage det senere?', 'build'),
    sentence('Det er lige meget for mig, hvor vi spiser.', 'Мне всё равно, где мы будем есть.', 'For mig уточняет личное отсутствие предпочтения. Само Det er lige meget! может прозвучать как обесценивание чужой проблемы.', 'type'),
    sentence('Nå, så giver det mening.', 'А, тогда понятно.', 'Nå здесь отмечает новое понимание. То же слово с иной интонацией может выражать удивление или переход к новой теме; единого русского эквивалента нет.', 'choice', [], ['А, тогда это понятно.']),
    sentence('Det passer mig desværre ikke i dag.', 'К сожалению, сегодня мне неудобно.', 'Passer mig — подходит мне по времени или обстоятельствам. Desværre смягчает отказ, но не заменяет его; при желании предложи другое время.', 'build'),
    sentence('Mener du, at vi skal mødes i morgen?', 'Ты имеешь в виду, что нам нужно встретиться завтра?', 'Mener du...? проверяет понимание без обвинения. Внутри at-части vi skal, без инверсии прямого вопроса.', 'type')
  ], 'conversation', 'orange'),
  lesson('c-work-talk', 'B2', 'Естественно на рабочей встрече', 'Не соглашаться и двигаться к решению',
    'Нейтральная рабочая речь сочетает ясность с признанием позиции собеседника. Det giver mening — признание логики, не обязательно полное согласие. Lad os lige... часто предлагает короткий совместный шаг, но не обещает, что задача объективно мала.', [
    sentence('Jeg kan godt se din pointe, men jeg er ikke helt enig.', 'Я понимаю твою мысль, но не совсем согласен.', 'Godt усиливает признание «да, понимаю», а не означает «хорошо видеть». Не совсем согласен — мягкое, но явное несогласие.', 'build', [], ['Я понимаю твою мысль, но не совсем согласна.']),
    sentence('Det giver mening, men hvordan gør vi det i praksis?', 'Это логично, но как нам сделать это на практике?', 'Giver mening — «имеет смысл, логично». Здесь признание логики сопровождается вопросом о реализации, а не согласием со всеми деталями.', 'choice'),
    sentence('Lad os lige få forventningerne på plads.', 'Давайте сначала согласуем ожидания.', 'Få noget på plads — прояснить и привести в порядок. Lige делает предложение разговорным; это не буквальное «поставить ожидания на место».', 'type'),
    sentence('Jeg vender tilbage, når jeg har tjekket tallene.', 'Я вернусь с ответом, когда проверю цифры.', 'Vende tilbage в таком контексте — снова связаться по вопросу. Har tjekket подчёркивает завершение проверки до следующего контакта.', 'build'),
    sentence('Kan vi tage den efter mødet?', 'Можем обсудить это после встречи?', 'Tage den — разговорное «разобрать этот вопрос» при уже понятной теме. В письме яснее: Kan vi drøfte spørgsmålet efter mødet?', 'choice'),
    sentence('Jeg er med på idéen, hvis vi får afklaret ansvaret.', 'Я поддерживаю идею, если мы проясним ответственность.', 'Være med på idéen — быть согласным участвовать или поддержать идею. Hvis сохраняет условие; не обещай безоговорочное согласие, убрав эту часть.', 'type')
  ], 'conversation', 'pink'),
  lesson('c-diplomacy', 'C1', 'Сложный разговор без тумана', 'Тактичное возражение, рамки и договорённость',
    'Профессиональная беглость — это точный смысл, подходящий регистр и умение проверить договорённость. Не превращай каждую фразу в канцелярит: сначала назови позицию, затем основание и нужный следующий шаг. Здесь тренируются отдельные сложные коммуникативные ситуации.', [
    sentence('Jeg kan følge dig et stykke ad vejen, men jeg er ikke enig i konklusionen.', 'Отчасти я согласен, но с выводом не согласен.', 'Følge dig et stykke ad vejen здесь означает частичную поддержку рассуждения. Это не буквальное сопровождение в пути: последняя часть ясно обозначает границу согласия.', 'choice', [], ['Отчасти я согласна, но с выводом не согласна.']),
    sentence('Det ville jeg være varsom med at konkludere på det grundlag.', 'Я бы поостерёгся делать такой вывод на этом основании.', 'Være varsom med at — проявлять осторожность в действии. Ville смягчает возражение, а på det grundlag точно называет его основание.', 'build', [], ['Я бы поостереглась делать такой вывод на этом основании.']),
    sentence('Hvis jeg forstår dig ret, foreslår du at udsætte beslutningen.', 'Если я правильно тебя понимаю, ты предлагаешь отложить решение.', 'Проверка понимания даёт собеседнику возможность исправить пересказ. После начального придаточного в главной части foreslår du — инверсия.', 'type'),
    sentence('Jeg vil gerne skelne mellem intentionen og den faktiske virkning.', 'Я хотел бы разграничить намерение и фактический результат.', 'Skelne mellem A og B — провести различие. Фраза помогает обсуждать последствия, не приписывая другому человеку плохих намерений.', 'build', [], ['Я хотела бы разграничить намерение и фактический результат.']),
    sentence('Det ændrer ikke ved, at vi skal overholde fristen.', 'Это не отменяет того, что мы должны соблюсти срок.', 'Ændrer ikke ved, at... признаёт предыдущую информацию, но сохраняет обязательство. Это твёрдая формулировка; используй её для реальной границы.', 'choice'),
    sentence('Skal vi aftale, hvem der følger op, og hvornår?', 'Давайте договоримся, кто продолжит работу по вопросу и когда?', 'Følge op — предпринять следующие действия и проверить результат. Hvem der følger op — косвенный вопрос о подлежащем, без инверсии følger hvem.', 'type')
  ], 'conversation', 'violet')
];

export const languageNotes = [
  { id: 'register-hvad', title: 'Hvad → hva’', formal: 'Hvad siger du?', spoken: 'Hva’ siger du?', meaning: 'Что ты говоришь? / Что ты сказал?', level: 'A2', note: 'Hva’ — способ передать разговорное сокращение на письме, а не отдельное нормативное написание для делового текста. В обычной письменной речи и в ответах курса пиши hvad. Здесь нет точной фонетической транскрипции.' },
  { id: 'register-ikke', title: 'Ikke → ikk’', formal: 'Det ved jeg ikke.', spoken: 'Det ved jeg ikk’.', meaning: 'Я этого не знаю.', level: 'A2', note: 'Ikk’ может встречаться в переписке и передаче диалога. В нейтральном письменном тексте сохраняй ikke. Ikk’ в конце вопроса также может просить подтверждения; значение определяет вся реплика.' },
  { id: 'register-skulle', title: 'Skulle → sku’', formal: 'Jeg skulle lige spørge om noget.', spoken: 'Jeg sku’ lige spørge om noget.', meaning: 'Я хотел кое о чём спросить.', level: 'B1', note: 'Sku’ здесь передаёт сокращённое skulle. Не путай его со sgu: sgu — отдельная разговорная усилительная частица, которая может восприниматься как фамильярная или грубоватая. В рабочем письме используй skulle.' },
  { id: 'register-gide', title: 'Gider: желание и просьба', formal: 'Vil du være sød at lukke døren?', spoken: 'Gider du lige lukke døren?', meaning: 'Закроешь, пожалуйста, дверь?', level: 'B1', note: 'Gide связан с желанием или готовностью потрудиться. Gider du...? может быть обычной просьбой, но с резким тоном — упрёком. Jeg gider ikke звучит прямее, чем мягкое Jeg har ikke lige overskud til det.' },
  { id: 'register-naa', title: 'Nå: реакция и переход', formal: 'Det forstår jeg. Skal vi fortsætte?', spoken: 'Nå, skal vi videre?', meaning: 'Ну что, продолжим?', level: 'B1', note: 'Nå может отмечать понимание, удивление или переход к следующему действию. Это не универсальное русское «ну»: без контекста и интонации нельзя однозначно восстановить тон.' },
  { id: 'register-nok', title: 'Nok: не только «достаточно»', formal: 'Jeg forventer, at det løser sig.', spoken: 'Det går nok.', meaning: 'Думаю, всё обойдётся.', level: 'B1', note: 'В Det går nok слово nok выражает ожидание благополучного исхода. В Vi har nok tid оно может означать «у нас достаточно времени»; место в предложении и контекст помогают различать значения.' },
  { id: 'register-jo', title: 'Jo: ответ и общая предпосылка', formal: 'Det ved du allerede.', spoken: 'Det ved du jo.', meaning: 'Ты ведь это знаешь.', level: 'B2', note: 'Внутри фразы jo подаёт информацию как известную или очевидную собеседнику; это может звучать дружелюбно или назидательно. Отдельное Jo! в ответ на отрицательный вопрос подтверждает положительный факт: Kommer du ikke? — Jo.' },
  { id: 'register-lige', title: 'Lige: небольшая просьба', formal: 'Kan vi afklare ansvaret?', spoken: 'Kan vi lige få ansvaret på plads?', meaning: 'Давайте уточним, кто за что отвечает.', level: 'B2', note: 'Lige часто представляет действие как короткое или несложное и смягчает просьбу. Это не обещание, что работа займёт минуту. Отдельно Det er lige meget означает «это неважно / всё равно», иногда с оттенком безразличия.' }
];

export const glossary = [
  { da: 'Det kommer an på ...', ru: 'Это зависит от ...', note: 'После på называй условие: Det kommer an på prisen. Это не буквальное «приходит на».' },
  { da: 'at få noget på plads', ru: 'прояснить / уладить что-либо', note: 'Få aftalen på plads — согласовать договорённость. Значение шире физического перемещения предмета.' },
  { da: 'at vende tilbage til noget', ru: 'вернуться к вопросу', note: 'В рабочем разговоре Jeg vender tilbage означает также «я свяжусь позже с ответом». Укажи срок, если обещаешь следующий контакт.' },
  { da: 'at holde hovedet koldt', ru: 'сохранять хладнокровие', note: 'Не терять способность спокойно рассуждать под давлением; речь не о температуре головы.' },
  { da: 'at slå koldt vand i blodet', ru: 'успокоиться и не горячиться', note: 'Призыв снизить тревогу или возбуждение. Прямое Slå koldt vand i blodet может прозвучать покровительственно.' },
  { da: 'at have is i maven', ru: 'сохранять выдержку и не торопиться', note: 'Терпеливо выдерживать неопределённость или риск. Это не совет игнорировать проблему.' },
  { da: 'at tage noget med et gran salt', ru: 'относиться к чему-либо с долей скепсиса', note: 'Не принимать сообщение целиком на веру; это не означает автоматически считать его ложью.' },
  { da: 'at have mange bolde i luften', ru: 'заниматься множеством дел одновременно', note: 'Метафора жонглирования задачами; может описывать загруженность, а не обязательно успешную работу.' },
  { da: 'at være på bølgelængde', ru: 'быть на одной волне', note: 'Понимать друг друга и сходиться в подходе; не требует полного согласия по каждому вопросу.' },
  { da: 'at gå lige til sagen', ru: 'перейти прямо к делу', note: 'Lad os gå lige til sagen — предложение сразу обсудить суть. В официальной речи допустимо, если тон уместен.' },
  { da: 'Det går op for mig, at ...', ru: 'До меня доходит, что ...', note: 'Осознание, которое возникает в определённый момент. В прошедшем: Det gik op for mig.' },
  { da: 'at stå mål med noget', ru: 'быть соразмерным / оправдывать что-либо', note: 'Står gevinsten mål med indsatsen? — Оправдывает ли польза затраченные усилия? Часто употребляется в аналитической речи.' }
];
