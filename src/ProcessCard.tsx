interface IPropsProcessCard {
  title: string;
  process: {
    id: string;
    name: string;
    running_time_formatted: string;
    memory_in_bytes: number;
  };
}

const ProcessCard: React.FC<IPropsProcessCard> = (props) => {
  return (
    <div className='process-card'>
      <h3>{props.title}</h3>
      <p>
        {props.process.name} (ID: {props.process.id})
      </p>
      <p>Running Time: {props.process.running_time_formatted}</p>
      <p>Memory: {props.process.memory_in_bytes}</p>
    </div>
  );
};

export default ProcessCard;
