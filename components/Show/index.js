import styled from "styled-components";
import Episode from "../Episode";
import Season from "../Season";
import { useImmer } from "use-immer";
const Title = styled.h1`
  text-decoration: underline;
  font-size: 1.7rem;
  text-decoration-color: var(--nemo);
  text-underline-offset: 2px;
  text-decoration-thickness: 2px;
  margin: 0;
`;

const StyledShow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export default function Show({ initialSeasons = [] }) {
  const [seasons, updateSeasons] = useImmer(initialSeasons);

  function handleToggleHasSeen(seasonNumber, episodeNumber) {
    // Wrong state mutation!
    // setSeasons((prevSeasons) => {
    //   const season = prevSeasons.find(({ number }) => number === seasonNumber);
    //   const episode = season.episodes.find(
    //     ({ number }) => number === episodeNumber
    //   );
    //   episode.hasSeen = !episode.hasSeen;
    //   console.log(prevSeasons);
    //   return prevSeasons;
    // });
    /* Valid state update
    setSeasons(
      // we use map directly on out state variable seasons
      seasons.map((season) => {
        // identify the season to update by seasonNumber parameter
        if (season.number === seasonNumber) {
          // create a new season object by spreading
          const updatedSeason = {
            ...season,
            // map through episodes to identify the episode to toggle hasSeen value
            episodes: season.episodes.map((episode) => {
              if (episodeNumber !== episode.number) {
                // if not the identified one return as is
                return episode;
              }
              // otherwise create a new episode object with toggled hasSeen value
              return { ...episode, hasSeen: !episode.hasSeen };
            }),
          };
          // return the (updated) newSeason object
          return updatedSeason;
        }
        // if not the identified season return as is
        return season;
      })
    );
    */
    // Using the useImmer hook allows us to perform a state update by changing the corresponding values directly
    updateSeasons((draft) => {
      // identify the season object via find
      const season = draft.find((season) => seasonNumber === season.number);
      // identfiy the episode object via find
      const episode = season.episodes.find(
        (episode) => episodeNumber === episode.number
      );
      // manipulate the value of the object directly
      episode.hasSeen = !episode.hasSeen;
    });
  }

  return (
    <StyledShow>
      <Title>A Series of Unfortunate Events</Title>
      {seasons.map((season) => (
        <Season key={season.number} number={season.number}>
          {season.episodes.map((episode) => (
            <Episode
              key={episode.number}
              number={episode.number}
              title={episode.title}
              hasSeen={episode.hasSeen}
              onToggleHasSeen={handleToggleHasSeen}
              seasonNumber={season.number}
            />
          ))}
        </Season>
      ))}
    </StyledShow>
  );
}
