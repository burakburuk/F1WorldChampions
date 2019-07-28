import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChampionsByYearUtil from '../../utils/ChampionsByYearUtil';
import WinnerInYearTableHeader from '../presentational/WinnerInYearTableHeader';
import WinnerItemInYear from '../presentational/WinnerItemInYear';

class WinnerTableInYearContainer extends Component {
    render() {
        const championList = this.getRacerList();

        return (
            <div className='winner-in-year'>
                <table>
                    <tbody>
                        <WinnerInYearTableHeader />
                        {championList}
                    </tbody>
                </table>
            </div>
        );
    }

    getRacerList = () => {
        const { listByYear, numberOfChampionsInSeason, selectedDriverId } = this.props;
        const itemList = [];
        for (let i = 0; i < numberOfChampionsInSeason; i++) {
            const racer = ChampionsByYearUtil.getChampionViewModel(listByYear[i], selectedDriverId);
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

const mapStateToProps = state => ({
    listByYear: state.champions.listByYear,
    numberOfChampionsInSeason: state.champions.numberOfChampionsInSeason,
    selectedDriverId: state.champions.selectedDriverId,
});

export default connect(mapStateToProps)(WinnerTableInYearContainer);