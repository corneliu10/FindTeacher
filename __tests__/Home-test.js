import React from 'react';
import 'react-native';
import Home from "../screens/Home";
import renderer from 'react-test-renderer';

test("Home snapshot", () => {
    const snap = renderer.create(
        <Home />
    ).toJSON();
expect(snap).toMatchSnapshot()
})