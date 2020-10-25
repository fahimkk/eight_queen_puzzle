import unittest
import pytest
from hypothesis import given, settings, Verbosity, example
from hypothesis import strategies as st
import eight_queen_puzzle

class TestQueen (unittest.TestCase):
    partial_list = zip('1425'*8, range(1,9))
    def test_printBoard_1(self):
       for tup in self.partial_list: 
           imp = eight_queen_puzzle.checkPlacement_imp(tup[0],tup[1])
           func = eight_queen_puzzle.checkPlacement_func(tup[0],tup[1])
           self.assertEqual(imp,func)

@settings(verbosity=Verbosity.verbose)
@given(st.integers(min_value=1, max_value=99999), st.integers(min_value=1, max_value=8))
def test_printBoard(num, col):
    imp = eight_queen_puzzle.checkPlacement_imp(str(num), col)
    func = eight_queen_puzzle.checkPlacement_func(str(num), col)
    assert imp == func

