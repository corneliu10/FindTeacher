import React from 'react';
import 'react-native';
import Login from "../screens/Login";
import renderer from 'react-test-renderer';

test("Home snapshot", () => {
    const snap = renderer.create(
        <Login />
    ).toJSON();
expect(snap).toMatchSnapshot()
})