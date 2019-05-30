import React from 'react';
import 'react-native';
import SearchButton from "../components/SearchButton";
import renderer from 'react-test-renderer';

test("Home snapshot", () => {
    const snap = renderer.create(
        <SearchButton />
    ).toJSON();
expect(snap).toMatchSnapshot()
})