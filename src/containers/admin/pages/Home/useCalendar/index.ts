import { calendarInfoType } from '@/containers/admin/interfaces/home';

export interface calendarProps {
    canData: calendarInfoType[];
    year: string;
}

const useCalendar = ({ canData = [], year = '' }: calendarProps) => {
    const getData = (mydata: calendarInfoType[]) => {
        return mydata.map((item: calendarInfoType) => {
            const num = parseInt(item.num);
            return [item.blogCreateTime, num];
        });
    };

    const buildData = getData(canData);
    console.log(buildData);
    return {
        tooltip: {
            position: 'top'
        },
        visualMap: {
            min: 0,
            max: 5,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            top: 'top',
            inRange: {
                color: ['#ebedf0', '#216e39']
            }
        },
        calendar: [
            {
                range: year,
                cellSize: ['auto', 15]
            }
        ],
        series: [
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 0,
                data: buildData
            }
        ]
    };
};

export default useCalendar;
