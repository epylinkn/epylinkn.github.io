---
layout: post
title:  "Music Sounds Better With You"
date:   2018-12-14 00:00:01 -0400
tags: wip
categories: neural-aesthetic
---

The Goal
--------

The goal of this project is simple: create a room-scale installation that recognizes when a visitor is dancing and continue the music until they stop dancing.

We broke this down into a few major components along with our desired technologies:
- Music -- quad speakers, controlled via Ableton
- Dance recognition -- custom neural network trained to identify dancing
  - Using Kinect to get reliable x/y/z joint data

First Iteration
---------------

The first iteration, which I wasn't involved in w.r.t. to the machine learning aspects used Wekinator. The results were subpar but I want to say they were "good enough". We set out to see if we can do better with a custom model.

Collecting Data
---------------

Data was collected via a Kinect, relying on the SDK to give us quick positional reads on major joints. At the outset, we reasoned that a neural network could view this data over time and classify someone as dancing or not dancing.

We quickly got positional (X, Y, and Z!) timeseries data, collected at 60fps. We chose to only focus on major joints:

- Head
- Left / Right Hand
- Left / Right Foot
- Left / Right Hip
- Left / Right Knee
- Left / Right / Center Shoulder
- Left / Right Elbow

We recorded the data in the microstudio, for now just getting samples of our friends. For various lengths, we recorded about ~12 people dancing and not dancing.

An example of Asha dancing:
```
p1/id	p1/hip:tx	p1/hip:ty	p1/hip:tz	p1/spine:tx	p1/spine:ty	p1/spine:tz	p1/neck:tx	p1/neck:ty	p1/neck:tz	p1/head:tx	p1/head:ty	p1/head:tz	p1/shoulder_l:tx	p1/shoulder_l:ty	p1/shoulder_l:tz	p1/elbow_l:tx	p1/elbow_l:ty	p1/elbow_l:tz	p1/wrist_l:tx	p1/wrist_l:ty	p1/wrist_l:tz	p1/hand_l:tx	p1/hand_l:ty	p1/hand_l:tz	p1/shoulder_r:tx	p1/shoulder_r:ty	p1/shoulder_r:tz	p1/elbow_r:tx	p1/elbow_r:ty	p1/elbow_r:tz	p1/wrist_r:tx	p1/wrist_r:ty	p1/wrist_r:tz	p1/hand_r:tx	p1/hand_r:ty	p1/hand_r:tz	p1/hip_l:tx	p1/hip_l:ty	p1/hip_l:tz	p1/knee_l:tx	p1/knee_l:ty	p1/knee_l:tz	p1/ankle_l:tx	p1/ankle_l:ty	p1/ankle_l:tz	p1/foot_l:tx	p1/foot_l:ty	p1/foot_l:tz	p1/hip_r:tx	p1/hip_r:ty	p1/hip_r:tz	p1/knee_r:tx	p1/knee_r:ty	p1/knee_r:tz	p1/ankle_r:tx	p1/ankle_r:ty	p1/ankle_r:tz	p1/foot_r:tx	p1/foot_r:ty	p1/foot_r:tz	p1/shoulder_c:tx	p1/shoulder_c:ty	p1/shoulder_c:tz	p1/handtip_l:tx	p1/handtip_l:ty	p1/handtip_l:tz	p1/thumb_l:tx	p1/thumb_l:ty	p1/thumb_l:tz	p1/handtip_r:tx	p1/handtip_r:ty	p1/handtip_r:tz	p1/thumb_r:tx	p1/thumb_r:ty	p1/thumb_r:tz
0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
1	0.6571181	-0.4855698	3.270197	0.6677687	-0.2338682	3.128278	0.671046	0.01328825	2.974214	0.6823147	0.09263748	2.928109	0.536656	-0.04231028	3.018725	0.4406241	-0.2114694	3.047542	0.4510829	-0.3102135	2.853482	0.4607846	-0.338073	2.796291	0.7971156	-0.1025144	3.037967	0.5985002	-0.1371219	2.894311	0.3973529	-0.2327948	2.788341	0.4150921	-0.3133428	2.846622	0.5813985	-0.4738263	3.245063	0.6439039	-0.8077299	3.264034	0.6209223	-1.178469	3.252339	0.6148567	-1.248895	3.175899	0.7221497	-0.487594	3.238261	0.6327583	-0.8790705	3.287389	0.6111939	-1.215627	3.253727	0.5983229	-1.289537	3.165969	0.6714199	-0.04805248	3.014963	0.4945238	-0.3569807	2.763477	0.4417358	-0.359529	2.778549	0.4154089	-0.3351894	2.824072	0.4248407	-0.3103353	2.832681
1	0.6571181	-0.4855698	3.270197	0.6677687	-0.2338682	3.128278	0.671046	0.01328825	2.974214	0.6823147	0.09263748	2.928109	0.536656	-0.04231028	3.018725	0.4406241	-0.2114694	3.047542	0.4510829	-0.3102135	2.853482	0.4607846	-0.338073	2.796291	0.7971156	-0.1025144	3.037967	0.5985002	-0.1371219	2.894311	0.3973529	-0.2327948	2.788341	0.4150921	-0.3133428	2.846622	0.5813985	-0.4738263	3.245063	0.6439039	-0.8077299	3.264034	0.6209223	-1.178469	3.252339	0.6148567	-1.248895	3.175899	0.7221497	-0.487594	3.238261	0.6327583	-0.8790705	3.287389	0.6111939	-1.215627	3.253727	0.5983229	-1.289537	3.165969	0.6714199	-0.04805248	3.014963	0.4945238	-0.3569807	2.763477	0.4417358	-0.359529	2.778549	0.4154089	-0.3351894	2.824072	0.4248407	-0.3103353	2.832681
1	0.6571181	-0.4855698	3.270197	0.6677687	-0.2338682	3.128278	0.671046	0.01328825	2.974214	0.6823147	0.09263748	2.928109	0.536656	-0.04231028	3.018725	0.4406241	-0.2114694	3.047542	0.4510829	-0.3102135	2.853482	0.4607846	-0.338073	2.796291	0.7971156	-0.1025144	3.037967	0.5985002	-0.1371219	2.894311	0.3973529	-0.2327948	2.788341	0.4150921	-0.3133428	2.846622	0.5813985	-0.4738263	3.245063	0.6439039	-0.8077299	3.264034	0.6209223	-1.178469	3.252339	0.6148567	-1.248895	3.175899	0.7221497	-0.487594	3.238261	0.6327583	-0.8790705	3.287389	0.6111939	-1.215627	3.253727	0.5983229	-1.289537	3.165969	0.6714199	-0.04805248	3.014963	0.4945238	-0.3569807	2.763477	0.4417358	-0.359529	2.778549	0.4154089	-0.3351894	2.824072	0.4248407	-0.3103353	2.832681
1	0.6571181	-0.4855698	3.270197	0.6677687	-0.2338682	3.128278	0.671046	0.01328825	2.974214	0.6823147	0.09263748	2.928109	0.536656	-0.04231028	3.018725	0.4406241	-0.2114694	3.047542	0.4510829	-0.3102135	2.853482	0.4607846	-0.338073	2.796291	0.7971156	-0.1025144	3.037967	0.5985002	-0.1371219	2.894311	0.3973529	-0.2327948	2.788341	0.4150921	-0.3133428	2.846622	0.5813985	-0.4738263	3.245063	0.6439039	-0.8077299	3.264034	0.6209223	-1.178469	3.252339	0.6148567	-1.248895	3.175899	0.7221497	-0.487594	3.238261	0.6327583	-0.8790705	3.287389	0.6111939	-1.215627	3.253727	0.5983229	-1.289537	3.165969	0.6714199	-0.04805248	3.014963	0.4945238	-0.3569807	2.763477	0.4417358	-0.359529	2.778549	0.4154089	-0.3351894	2.824072	0.4248407	-0.3103353	2.832681
1	0.6571181	-0.4855698	3.270197	0.6677687	-0.2338682	3.128278	0.671046	0.01328825	2.974214	0.6823147	0.09263748	2.928109	0.536656	-0.04231028	3.018725	0.4406241	-0.2114694	3.047542	0.4510829	-0.3102135	2.853482	0.4607846	-0.338073	2.796291	0.7971156	-0.1025144	3.037967	0.5985002	-0.1371219	2.894311	0.3973529	-0.2327948	2.788341	0.4150921	-0.3133428	2.846622	0.5813985	-0.4738263	3.245063	0.6439039	-0.8077299	3.264034	0.6209223	-1.178469	3.252339	0.6148567	-1.248895	3.175899	0.7221497	-0.487594	3.238261	0.6327583	-0.8790705	3.287389	0.6111939	-1.215627	3.253727	0.5983229	-1.289537	3.165969	0.6714199	-0.04805248	3.014963	0.4945238	-0.3569807	2.763477	0.4417358	-0.359529	2.778549	0.4154089	-0.3351894	2.824072	0.4248407	-0.3103353	2.832681
1	0.6571181	-0.4855698	3.270197	0.6677687	-0.2338682	3.128278	0.671046	0.01328825	2.974214	0.6823147	0.09263748	2.928109	0.536656	-0.04231028	3.018725	0.4406241	-0.2114694	3.047542	0.4510829	-0.3102135	2.853482	0.4607846	-0.338073	2.796291	0.7971156	-0.1025144	3.037967	0.5985002	-0.1371219	2.894311	0.3973529	-0.2327948	2.788341	0.4150921	-0.3133428	2.846622	0.5813985	-0.4738263	3.245063	0.6439039	-0.8077299	3.264034	0.6209223	-1.178469	3.252339	0.6148567	-1.248895	3.175899	0.7221497	-0.487594	3.238261	0.6327583	-0.8790705	3.287389	0.6111939	-1.215627	3.253727	0.5983229	-1.289537	3.165969	0.6714199	-0.04805248	3.014963	0.4945238	-0.3569807	2.763477	0.4417358	-0.359529	2.778549	0.4154089	-0.3351894	2.824072	0.4248407	-0.3103353	2.832681
1	0.6571181	-0.4855698	3.270197	0.6677687	-0.2338682	3.128278	0.671046	0.01328825	2.974214	0.6823147	0.09263748	2.928109	0.536656	-0.04231028	3.018725	0.4406241	-0.2114694	3.047542	0.4510829	-0.3102135	2.853482	0.4607846	-0.338073	2.796291	0.7971156	-0.1025144	3.037967	0.5985002	-0.1371219	2.894311	0.3973529	-0.2327948	2.788341	0.4150921	-0.3133428	2.846622	0.5813985	-0.4738263	3.245063	0.6439039	-0.8077299	3.264034	0.6209223	-1.178469	3.252339	0.6148567	-1.248895	3.175899	0.7221497	-0.487594	3.238261	0.6327583	-0.8790705	3.287389	0.6111939	-1.215627	3.253727	0.5983229	-1.289537	3.165969	0.6714199	-0.04805248	3.014963	0.4945238	-0.3569807	2.763477	0.4417358	-0.359529	2.778549	0.4154089	-0.3351894	2.824072	0.4248407	-0.3103353	2.832681
1	0.6571181	-0.4855698	3.270197	0.6677687	-0.2338682	3.128278	0.671046	0.01328825	2.974214	0.6823147	0.09263748	2.928109	0.536656	-0.04231028	3.018725	0.4406241	-0.2114694	3.047542	0.4510829	-0.3102135	2.853482	0.4607846	-0.338073	2.796291	0.7971156	-0.1025144	3.037967	0.5985002	-0.1371219	2.894311	0.3973529	-0.2327948	2.788341	0.4150921	-0.3133428	2.846622	0.5813985	-0.4738263	3.245063	0.6439039	-0.8077299	3.264034	0.6209223	-1.178469	3.252339	0.6148567	-1.248895	3.175899	0.7221497	-0.487594	3.238261	0.6327583	-0.8790705	3.287389	0.6111939	-1.215627	3.253727	0.5983229	-1.289537	3.165969	0.6714199	-0.04805248	3.014963	0.4945238	-0.3569807	2.763477	0.4417358	-0.359529	2.778549	0.4154089	-0.3351894	2.824072	0.4248407	-0.3103353	2.832681
```

Preparing Data
--------------

Hadn't done much of this before beyond the basic understandings of the general primitives: numpy for arrays and pandas for dataframes. In doing this, you really start to realize that this is where the bulk of time is spent.

Some algorithmic choices of note:
* We decided to batch and average the frames. The data was recording at 60fps but this sometimes didn't change from frame-to-frame. So to make sure we get change from data point to data point, we decide to batch and average the positions every 5 frames. We're also exploring just taking every 5th frame, which might remove some of the noise even better. To be continued...
* On each batchframe, we take the difference between the current and previous frame to determine a velocity. This has the added benefit of not needing to calibrate absolute position between dancers but let's us focus on the movement of gestures.
* We take only a slice (from the ~middle) of 200 batchframes per recording. This number is important because we want to use an LSTM and we'll need consistent timeseries data between each recording, as well as a way to differentiate between recordings -- e.g. end of recording A shouldn't be the input sequence for recording B.

```python
import os
import numpy as np
import pandas as pd

frames_per_batch = 5
timesteps = 1000
start_frame = 100 // frames_per_batch
end_frame = (100 + timesteps) // frames_per_batch

columns = pd.read_csv("columns.tsv", sep="\t").columns

# create empty dataset for training
data = pd.DataFrame(columns=columns)

def processData(inFile, classification):
    frames = pd.read_csv(inFile, sep="\t", usecols=columns);

    # hack(?) to average frames in groups of `frames_per_batch`
    frames = frames.groupby(frames.index // frames_per_batch).mean()

    # calculate the difference (i.e. velocity between batchframes)
    for col in columns:
        if "p1" not in col:
            next

        dkey = col[0:-2] + 'd' + col[-1]
        frames[dkey] = frames[col].diff()

    frames["classification"] = 1 if classification == "dancing" else 0
    #frames["user"] = inFile

    return frames.iloc[start_frame:end_frame]

res = None
for file in os.listdir(os.getcwd()):
	if file.startswith("dancing") and file.endswith(".tsv"):
		res = processData(file, "dancing")
	elif file.startswith("notdancing") and file.endswith(".tsv"):
		res = processData(file,"not dancing")

	if res is not None:
		data = pd.concat([data, res], sort=False)
	res = None

print(len(data))

data.to_csv("cleaned_data.csv")
```

Normalizing Data
----------------

Because the internet said it's a good idea, we decided to normalize our data with the simple `MinMaxScaler` from `sklearn`. This puts all our readings within 0 and 1, instead of the messy negative velocities.

```python
from sklearn.preprocessing import MinMaxScaler

dataset = data.values
dataset = dataset.astype('float32')
scaler = MinMaxScaler(feature_range=(0, 1))
dataset = scaler.fit_transform(dataset)
```

Shaping Data
------------

LSTMs are quite particular about how the input data is shaped since it accepts timeseries data. Wrangling data proved to be the biggest rabbithole / time sink. NOTE: A really useful command is `numpy#shape`!

```python
datasets_split = np.split(np.array(dataset), 23)

# Create proper datasets for each individual's sample
xs, ys = [], []

def add_to_dataset(frames):
    classification = frames[0][-1]
    if classification == 1.0:
        ys.append([1.0, 0.0])
    else:
        ys.append([0.0, 1.0])
    
    velocities = []
    for row in frames:
        velocities.append(row[-44:-2])
        
    xs.append(velocities)


# create the dataset
for frames in datasets_split:
    add_to_dataset(frames)

x_train = np.array(xs)
y_train = np.array(ys)
```

Training the Model
------------------

### Stacked LSTM for sequence classification

```python
data_dim = 42
timesteps = 200
num_classes = 2

# expected input data shape: (batch_size, timesteps, data_dim)
model = Sequential()
model.add(LSTM(32, return_sequences=True,
               input_shape=(timesteps, data_dim)))  # returns a sequence of vectors of dimension 42
model.add(LSTM(32, return_sequences=True))  # returns a sequence of vectors of dimension 32
model.add(LSTM(32))  # return a single vector of dimension 32
model.add(Dense(2, activation='softmax'))

model.compile(loss='categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])

model.fit(x_train, y_train,
          batch_size=3, epochs=10)
```

Evaluating the Model
--------------------

Unfortunately, we aren't getting great results... at all. When we run the `x_train` dataset through the model we see that most everything is classified as not-dancing. It's not the proper way to evaluate a model but we expect to see at least an overfitted correlation.

```
model.predict(x_train)

=>
array([[0.48443928, 0.5155606 ],
       [0.48224613, 0.51775384],
       [0.48893583, 0.5110642 ],
       [0.4826293 , 0.5173707 ],
       [0.44891062, 0.55108935],
       [0.49425253, 0.50574744],
       [0.47287473, 0.52712524],
       [0.49062234, 0.50937766],
       [0.4691325 , 0.53086746],
       [0.47541767, 0.5245824 ],
       [0.49243382, 0.50756615],
       [0.42587626, 0.57412374],
       [0.44929534, 0.55070466],
       [0.50357366, 0.49642634],
       [0.48033652, 0.51966345],
       [0.4515187 , 0.5484812 ],
       [0.4908459 , 0.50915414],
       [0.43472576, 0.56527424],
       [0.4599356 , 0.54006433],
       [0.4632047 , 0.5367953 ],
       [0.4712061 , 0.52879393],
       [0.47320852, 0.5267915 ],
       [0.47662145, 0.52337855]], dtype=float32)
```

Next Steps
----------

I think there's a bug somewhere, but I also think we don't have nearly enough data. I think something we can do is splice our data better to get more input sequences -- e.g. scenes 1-10, 2-11, 3-12 -- per dance recording.

I still think RNN / LSTM is the right way forward.
