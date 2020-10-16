import unittest

class DummyTests(unittest.TestCase):

    def test_one_eq_one(self):
        self.assertEqual(1,1)

if __name__ == '__main__':
    unittest.main()