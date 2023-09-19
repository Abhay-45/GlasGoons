export function getTop3SubgoalIds(data) {
  const subgoalCounts = {};

  data.result.forEach(item => {
    const subgoalId = item.result_subgoal_id;
    const subgoalName = item.subgoal.subgoal_name;

    if (subgoalCounts[subgoalId]) {
      subgoalCounts[subgoalId].count++;
    } else {
      subgoalCounts[subgoalId] = {
        name: subgoalName,
        count: 1
      };
    }
  });

  const sortedSubgoals = Object.values(subgoalCounts).sort((a, b) => b.count - a.count);
  const top3Subgoals = sortedSubgoals.slice(0, 3);

  return top3Subgoals.map(subgoal => subgoal.name);
}