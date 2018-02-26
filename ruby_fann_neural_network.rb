require 'ruby-fann'

train = RubyFann::TrainData.new(inputs: features, desired_outputs: labels)

fann = RubyFann::Standard.new(num_inputs: 576, # corresponds to a 24 * 24 pixel image
                              hidden_neurons: [300], # this can be tuned to see if you get better or worse performance
                              num_outputs: 10) # corresponds to the fact that there are 10 possible labels that can be output (0..9)

fann.train_on_data(train,
                   1000, # 1000 max APOCs
                   10, # for console output, every 10 APOCs let me know how we're doing
                   0.01) # desired mean squared error, if we get to that then stop