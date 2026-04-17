import FreeSpacedRepetitionScheudler, { Card, Grades } from "./fsrs";

const main = () => {
  let card = new Card();

  const f = new FreeSpacedRepetitionScheudler(
    true,
    0.93,
    36000,
    true,
    [10, 10, 10],
    [10, 10, 10],
  );

  let now = new Date();
  const ratings: Grades[] = [
    Grades.HARD,
    Grades.HARD,
    Grades.EASY,
    Grades.EASY,
    Grades.GOOD,
    Grades.EASY,
    Grades.AGAIN,
  ];

  const ivl_history: number[] = [];
  const s_history: number[] = [];
  const d_history: number[] = [];

  for (const rating of ratings) {
    const next = f.next(card, now, rating);

    card = next.card;
    ivl_history.push(card.scheudled_days);
    s_history.push(card.stability);
    d_history.push(card.difficulty);
    now = card.due;
    console.log(now, next.state);
  }

  console.log(ivl_history);
  console.log(s_history);
  console.log(d_history);
};

main();
