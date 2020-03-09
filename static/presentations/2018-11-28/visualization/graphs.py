#!/usr/bin/env python

import pylab as plt
from matplotlib_venn import venn2

v1=venn2(subsets = (14632, 10051, 521), set_labels = ('hg18', 'Orig.'))
plt.title("Without Liftover hg18 vs. GM eRNAs")
plt.show()

v=venn2(subsets = (14632, 10051, 7426), set_labels = ('Rep.', 'Orig.'))
v.get_patch_by_id('100').set_color('blue')
v.get_patch_by_id('010').set_color('red')
v.get_patch_by_id('110').set_color('purple')
plt.title("Reproduction vs GM eRNAs")
plt.show()
