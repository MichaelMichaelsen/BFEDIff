#!/usr/bin/perl
#
# analyzebfe.pl - compare the sfe on test03 and test06
#
use strict;
use mu;
use Data::Dump qw(dump);;
use Data::Compare;

my $bfein   = "Test06dataBFE.csv";
my $bfeout  = "Test06BFEout.csv";
open(BFEIN,"$bfein") or die "Unable to open $bfein";
open(BFEOUT,">$bfeout") or die "Unable to create $bfeout";
my $c = new Data::Compare;
my $header=<BFEIN>;
chomp($header);
printf BFEOUT "%s\n",$header;
while (my $line =<BFEIN>) {
   chomp($line);
   my @record    = split(/,/,$line);
   my $bfenummer = @record[0];
   $bfenummer    =~ s/\"//g;
   $record[0]    = $bfenummer;
   my $ejendomstype
                 = $record[1];
   $ejendomstype =~ s/\"//g;
   #printf "%s\n", $ejendomstype;
   my $objref03;
   my $objref06;

   if ($ejendomstype =~ m/^SFE/) {
      $objref03 = MUSamletFastEjendom('test03','SFEBFEnr',$bfenummer);
      $objref06 = MUSamletFastEjendom('test06','SFEBFEnr',$bfenummer);
   }
   if ($ejendomstype =~ m/^EJER/) {
      $objref03 = MUEjerlejlighed('test03','SFEBFEnr',$bfenummer);
      $objref06 = MUEjerlejlighed('test06','SFEBFEnr',$bfenummer);
   }
   if ($ejendomstype =~ m/^BPFG/) {
      $objref03 = MUBPFG('test03','SFEBFEnr',$bfenummer);
      $objref06 = MUBPFG('test06','SFEBFEnr',$bfenummer);
   }
   $record[3] = (defined $objref03             ? 'OK'    : 'Undef');
   $record[4] = (defined $objref06             ? 'OK'    : 'Undef');
   $record[5] = ($c->Cmp(\$objref03,\$objref06)? 'Match' : 'Diff');

   printf "%s\n", join(",",@record);
   printf BFEOUT "%s\n", join(",",@record);
}
close(BFEIN);
close(BFEOUT);
