import React from "react";
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Modal from 'react-native-modal'
import PublicationNavigation from './../../../navigation/publication-navigation'

class MainPublication extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {

    return (
      <Modal
        animationIn={'bounceInUp'}
        animationOut={'bounceInDown'}
        animationInTiming={1500}
        animationOutTiming={1500}
        style={styles.main_container}
        isVisible={this.props.isVisible}
        transparent={true}
        swipeDirection={'left'}
        propagateSwipe={true}
        onSwipeComplete={() => this.props.getBack()}
      >
        <PublicationNavigation screenProps={() => this.props.getBack()} />
      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 0
  }
})

const mapStateToProps = state => ({})

const ActionCreators = Object.assign({})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainPublication)