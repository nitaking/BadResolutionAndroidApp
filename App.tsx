import Carousel from "react-native-snap-carousel";
import React, {PureComponent} from "react";
import {Dimensions, Text, View, StyleSheet, TouchableOpacity} from "react-native";

const itemWidth = 100;
const styles = StyleSheet.create({
    pageNation: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: 'white',
    },
    card: {
        width: itemWidth,
        height: 150,
        backgroundColor: "green",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 6,
        marginTop: 30
    },
    activeIndex: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    }
});

let out = Array.from(Array(10), (_,x) => x);
const data = out.map(_ => ({ status: false }));

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}

const Card = ({item, index, onNext}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.activeIndex}>{`${index}`}</Text>
            <TouchableOpacity onPress={onNext} style={styles.button}>
                <Text>次へ</Text>
            </TouchableOpacity>
        </View>
    );
};

const Container = () => {
    const firstItem = 1;
    const [activeIndex, changeSlide] = React.useState(firstItem)
    const carouselRef = React.useRef(null)

    const onNext = React.useCallback( async () => {
        const lastIndex = data.length - 1
        const nextIndex = lastIndex ? activeIndex : activeIndex + 1;
        const carousel = carouselRef.current

        await sleep(10)
        carousel.snapToItem(activeIndex + 1)
        // setTimeout(() => carousel.snapToItem(nextIndex), 10)

        changeSlide(nextIndex)
    }, [activeIndex])

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Carousel
                ref={carouselRef}
                activeSlideAlignment={"center"}
                containerCustomStyle={{paddingLeft: 0, backgroundColor: '#dbffff', paddingTop: 200}}
                data={data}
                itemWidth={itemWidth}
                onSnapToItem={changeSlide}
                renderItem={({item}) => <Card item={item} index={activeIndex} onNext={onNext} />}
                sliderWidth={Dimensions.get("window").width}
                firstItem={firstItem}
            />
            <Text style={{color: "red"}}>{`Active index: ${activeIndex}`}</Text>
        </View>
    )
}

export default class App extends PureComponent {
    render() {
        return (
            <Container />
        );
    }
}
