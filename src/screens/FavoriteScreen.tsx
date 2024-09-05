import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStore} from '../store/Store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoritesItemCard';

const FavoriteScreen = ({navigation}: any) => {
  const FavouriteList = useStore((state: any) => state.FavoritesList);
  const addToFavourite = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavourite = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );
  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavourite(type, id) : addToFavourite(type, id);
  };
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <HeaderBar title="Favourites" />
          {FavouriteList.length == 0 ? (
            <EmptyListAnimation text="No Favourites" />
          ) : (
            <View style={styles.ListItemContainer}>
              {FavouriteList.map((data: any) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push('Details', {
                      index: data.index,
                      id: data.id,
                      type: data.type,
                    });
                  }}
                  key={data.id}>
                  <FavoritesItemCard
                    id={data.id}
                    imagelink_portrait={data.imagelink_portrait}
                    name={data.name}
                    special_ingredient={data.special_ingredient}
                    type={data.type}
                    ingredients={data.ingredients}
                    average_rating={data.average_rating}
                    ratings_count={data.ratings_count}
                    roasted={data.roasted}
                    description={data.description}
                    favourite={data.favourite}
                    ToggleFavouriteItem={ToggleFavourite}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default FavoriteScreen;
