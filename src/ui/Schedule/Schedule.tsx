import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Label,
} from "recharts";
import "./schedule.css";

interface IProps {
  data: Array<any>;
  activeIndex: number;
  handleActiveIndex: ({ index }: { index: number }) => void;
}

export const Schedule = ({ data, activeIndex, handleActiveIndex }: IProps) => {
  return (
    <>
      <ResponsiveContainer
        className="statistics__schedule-container"
        width="100%"
        height="100%"
      >
        <BarChart
          width={150}
          height={40}
          data={data}
          margin={{
            right: 22,
          }}
          barCategoryGap={20}
        >
          <CartesianGrid height={1} />
          <XAxis axisLine={false} tickLine={false} dataKey={"name"}>
            <Label offset={0} />
          </XAxis>
          <YAxis axisLine={false} tickLine={false} orientation="right" />
          <Bar dataKey="uv" onClick={handleActiveIndex}>
            {data.map(({ index }: { index: number }) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "#DC3E22" : "#EA8A79"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
