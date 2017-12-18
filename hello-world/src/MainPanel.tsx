/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');
var _ = require("underscore");

interface MainPanelProps {
    onPressNavigate: () => void;
}

const styles = {
    scroll: RX.Styles.createScrollViewStyle({
        alignSelf: 'stretch',
        backgroundColor: '#f5fcff'
    }),
    container: RX.Styles.createViewStyle({
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink'
    }),
    helloWorld: RX.Styles.createTextStyle({
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 28
    }),
    welcome: RX.Styles.createTextStyle({
        fontSize: 32,
        marginBottom: 12
    }),
    instructions: RX.Styles.createTextStyle({
        fontSize: 16,
        color: '#aaa',
        marginBottom: 16
    }),
    docLink: RX.Styles.createLinkStyle({
        fontSize: 16,
        color: 'blue',
        marginBottom: 16
    }),
    roundButton: RX.Styles.createViewStyle({
        margin: 16,
        borderRadius: 16,
        backgroundColor: '#7d88a9'
    }),
    buttonText: RX.Styles.createTextStyle({
        fontSize: 16,
        marginVertical: 6,
        marginHorizontal: 12,
        color: 'white'
    }),
    inputBox: RX.Styles.createTextInputStyle({
        backgroundColor: 'green',
        color:'#fff'
    })
};

class MainPanel extends RX.Component<MainPanelProps, null> {
    private _translationValue: RX.Animated.Value;
    private _animatedScaleValue: RX.Animated.Value;
    private _animatedOpacityValue: RX.Animated.Value;

    private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet;
    private _animatedViewStyle: RX.Types.AnimatedImageStyleRuleSet;

    constructor(props: MainPanelProps) {
        super(props);

        this._translationValue = RX.Animated.createValue(500);
        this._animatedScaleValue = RX.Animated.createValue(0);
        this._animatedOpacityValue = RX.Animated.createValue(0);

        this._animatedStyle = RX.Styles.createAnimatedTextStyle({
            transform: [
                {
                    translateX: this._translationValue,
                    scale: this._animatedScaleValue              
                }
            ]
        });

        this._animatedViewStyle = RX.Styles.createAnimatedImageStyle({
            opacity: this._animatedOpacityValue
        });
        
        
    }

    componentDidMount() {

        let compositeAnimation = RX.Animated.parallel([
            RX.Animated.timing(this._translationValue, {
                      toValue: 0,
                      easing: RX.Animated.Easing.InOutBack(),
                      duration: 500
                    }
                ),         
            RX.Animated.timing(this._animatedScaleValue,
                { 
                    toValue: 0.0, 
                    duration: 250, 
                    easing: RX.Animated.Easing.InOut() 
                }
            ),
            RX.Animated.timing(this._animatedOpacityValue,
                { 
                    toValue: 1, 
                    duration: 550, 
                    easing: RX.Animated.Easing.Linear()
                }
            )
        ]);    
        
       compositeAnimation.start(); 
    }

    render() {
        var elements = _.map(['Hello','Jinmin','Bo'], (ele:any) => {
            return (
                <RX.Text >
                    {ele}
                </RX.Text>        
            );
        });
        return (
            <RX.ScrollView style={ styles.scroll }>
                <RX.View style={ styles.container }>
                    <RX.Animated.Text style={ [styles.helloWorld, this._animatedStyle] }>
                        Hello World 2
                    </RX.Animated.Text>
                    <RX.Animated.View style={[this._animatedViewStyle]  }>
                   {elements}
                    </RX.Animated.View>
                    <RX.Text style={ styles.welcome }>
                        Welcome to ReactXP2
                    </RX.Text>
                    <RX.Text style={ styles.instructions }>
                        Edit App.tsx to get started
                    </RX.Text>
                    <RX.Link style={ styles.docLink } url={ 'https://microsoft.github.io/reactxp/docs' }  >
                        View ReactXP documentation
                    </RX.Link>
                    <RX.TextInput 
                    style={styles.inputBox}
                    autoCapitalize = {'characters'}  
                    autoCorrect={ true } 
                    autoFocus = {true} 
                    placeholder={'hello world'} 
                    placeholderTextColor={ '#fff'} 
                    multiline={true}/>
                    
                    <RX.Button style={ styles.roundButton } onPress={ this._onPressNavigate }>
                        <RX.Text style={ styles.buttonText }>
                            See More Examples
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            </RX.ScrollView>
        );
    }
    
    private _onPressNavigate = () => {
        this.props.onPressNavigate();
    }
}

export = MainPanel;
