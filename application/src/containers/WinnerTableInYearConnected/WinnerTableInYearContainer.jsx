import React, { Component } from 'react';
import PropTypes from 'prop-types';
import winnersInSeasonUtil from '../../utils/winnersInSeasonUtil';
import WinnerItemInYear from '../../components/WinnerItemInYear';
import WinnerTableInYear from '../../components/WinnerTableInYear';


class WinnerTableInYearContainer extends Component {
    render() {
        const championList = this.getRacerList();

        return (
            <WinnerTableInYear winners={championList} />
        );
    }

    getRacerList = () => {
        const { listByYear, numberOfChampionsInSeason, selectedDriverId } = this.props;
        const itemList = [];
        for (let i = 0; i < numberOfChampionsInSeason; i++) {
            const racer = winnersInSeasonUtil.getChampionViewModel(listByYear[i], selectedDriverId);
            if (racer) {
                itemList.push(
                    <WinnerItemInYear
                        key={racer.key}
                        name={racer.name}
                        year={racer.year}
                        date={racer.date}
                        company={racer.company}
                        highlight={racer.highlight}
                        race={racer.race}
                    />,
                );
            } else {
                itemList.push(<WinnerItemInYear key={`ChampionItemByYear-${i}`} />);
            }
        }
        return itemList;
    };
}

WinnerTableInYearContainer.propTypes = {
    listByYear: PropTypes.array.isRequired,
    numberOfChampionsInSeason: PropTypes.number,
    selectedDriverId: PropTypes.string,
};

export default WinnerTableInYearContainer;
